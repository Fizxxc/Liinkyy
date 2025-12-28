import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Get all links for current user
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const links = await sql`
      SELECT id, user_id, title, url, icon, position, visible, clicks, created_at
      FROM links
      WHERE user_id = ${userId}
      ORDER BY position ASC
    `;

    return Response.json({ links });
  } catch (err) {
    console.error("GET /api/links error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Create new link
export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { title, url, icon, visible } = body;

    if (!title || !url) {
      return Response.json(
        { error: "Title and URL required" },
        { status: 400 },
      );
    }

    // Get max position
    const maxPos = await sql`
      SELECT COALESCE(MAX(position), -1) as max_position
      FROM links
      WHERE user_id = ${userId}
    `;
    const newPosition = (maxPos[0]?.max_position || -1) + 1;

    const result = await sql`
      INSERT INTO links (user_id, title, url, icon, position, visible)
      VALUES (${userId}, ${title}, ${url}, ${icon || null}, ${newPosition}, ${visible !== false})
      RETURNING id, user_id, title, url, icon, position, visible, clicks, created_at
    `;

    return Response.json({ link: result[0] });
  } catch (err) {
    console.error("POST /api/links error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
