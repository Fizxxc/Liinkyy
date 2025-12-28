import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Update link
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const linkId = params.id;
    const body = await request.json();
    const { title, url, icon, visible, position } = body;

    // Build update query
    const setClauses = [];
    const values = [];

    if (title !== undefined) {
      setClauses.push(`title = $${values.length + 1}`);
      values.push(title);
    }
    if (url !== undefined) {
      setClauses.push(`url = $${values.length + 1}`);
      values.push(url);
    }
    if (icon !== undefined) {
      setClauses.push(`icon = $${values.length + 1}`);
      values.push(icon);
    }
    if (visible !== undefined) {
      setClauses.push(`visible = $${values.length + 1}`);
      values.push(visible);
    }
    if (position !== undefined) {
      setClauses.push(`position = $${values.length + 1}`);
      values.push(position);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    const query = `
      UPDATE links
      SET ${setClauses.join(", ")}
      WHERE id = $${values.length + 1} AND user_id = $${values.length + 2}
      RETURNING id, user_id, title, url, icon, position, visible, clicks, created_at
    `;

    const result = await sql(query, [...values, linkId, userId]);

    if (result.length === 0) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json({ link: result[0] });
  } catch (err) {
    console.error("PUT /api/links/[id] error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete link
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const linkId = params.id;

    const result = await sql`
      DELETE FROM links
      WHERE id = ${linkId} AND user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/links/[id] error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Track click
export async function POST(request, { params }) {
  try {
    const linkId = params.id;

    await sql`
      UPDATE links
      SET clicks = clicks + 1
      WHERE id = ${linkId}
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("POST /api/links/[id] (track click) error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
