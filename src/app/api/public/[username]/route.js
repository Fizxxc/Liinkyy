import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const username = params.username;

    // Get profile
    const profiles = await sql`
      SELECT id, username, display_name, bio, avatar_url, theme_color
      FROM user_profiles
      WHERE username = ${username}
      LIMIT 1
    `;

    if (profiles.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    const profile = profiles[0];

    // Get visible links
    const links = await sql`
      SELECT id, title, url, icon, clicks
      FROM links
      WHERE user_id = ${profile.id} AND visible = true
      ORDER BY position ASC
    `;

    return Response.json({ profile, links });
  } catch (err) {
    console.error("GET /api/public/[username] error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
