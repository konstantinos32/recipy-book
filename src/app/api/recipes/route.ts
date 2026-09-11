import sql from "@/lib/db";

export async function GET() {
  try {
    const recipes = await sql`
      SELECT *
      FROM recipes
      ORDER BY id DESC
    `;

    return Response.json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);

    return Response.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}