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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received recipe:", body);

    return Response.json(body, { status: 201 });
  } catch (error) {
    console.error("Failed to create recipe:", error);

    return Response.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}