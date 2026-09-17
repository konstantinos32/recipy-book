import sql from "@/lib/db";
import { recipeSchema } from "@/lib/validations/recipe";

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

    const result = recipeSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid recipe data",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    console.log("Validated recipe:", result.data);

    return Response.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Failed to create recipe:", error);

    return Response.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}