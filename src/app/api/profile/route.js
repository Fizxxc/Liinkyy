import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user profile
    const rows = await sql`
      SELECT id, user_id, username, display_name, bio, avatar_url, theme_color, created_at
      FROM user_profiles
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    const profile = rows?.[0] || null;
    return Response.json({ profile });
  } catch (err) {
    console.error("GET /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { username, display_name, bio, avatar_url, theme_color } = body;

    // Check if username is taken
    const existing = await sql`
      SELECT id FROM user_profiles
      WHERE username = ${username} AND user_id != ${userId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return Response.json(
        { error: "Username sudah digunakan" },
        { status: 400 },
      );
    }

    // Create profile
    const result = await sql`
      INSERT INTO user_profiles (user_id, username, display_name, bio, avatar_url, theme_color)
      VALUES (${userId}, ${username}, ${display_name}, ${bio || null}, ${avatar_url || null}, ${theme_color || "#FF6B9D"})
      RETURNING id, user_id, username, display_name, bio, avatar_url, theme_color, created_at
    `;

    return Response.json({ profile: result[0] });
  } catch (err) {
    console.error("POST /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { username, display_name, bio, avatar_url, theme_color } = body;

    // Check if username is taken by another user
    if (username) {
      const existing = await sql`
        SELECT id FROM user_profiles
        WHERE username = ${username} AND user_id != ${userId}
        LIMIT 1
      `;

      if (existing.length > 0) {
        return Response.json(
          { error: "Username sudah digunakan" },
          { status: 400 },
        );
      }
    }

    // Build update query
    const setClauses = [];
    const values = [];

    if (username !== undefined) {
      setClauses.push(`username = $${values.length + 1}`);
      values.push(username);
    }
    if (display_name !== undefined) {
      setClauses.push(`display_name = $${values.length + 1}`);
      values.push(display_name);
    }
    if (bio !== undefined) {
      setClauses.push(`bio = $${values.length + 1}`);
      values.push(bio);
    }
    if (avatar_url !== undefined) {
      setClauses.push(`avatar_url = $${values.length + 1}`);
      values.push(avatar_url);
    }
    if (theme_color !== undefined) {
      setClauses.push(`theme_color = $${values.length + 1}`);
      values.push(theme_color);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    const query = `
      UPDATE user_profiles
      SET ${setClauses.join(", ")}
      WHERE user_id = $${values.length + 1}
      RETURNING id, user_id, username, display_name, bio, avatar_url, theme_color, created_at
    `;

    const result = await sql(query, [...values, userId]);

    if (result.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ profile: result[0] });
  } catch (err) {
    console.error("PUT /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
