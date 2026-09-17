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

    const {
      title,
      description,
      ingredients,
      duration,
      servings,
      category,
      image,
    } = result.data;

    const ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);

    const [recipe] = await sql`
      INSERT INTO recipes (
        title,
        category,
        duration,
        servings,
        ingredients,
        description,
        image
      )
      VALUES (
        ${title},
        ${category},
        ${duration},
        ${servings},
        ${ingredientsArray},
        ${description},
        ${image || null}
      )
      RETURNING *
    `;

    return Response.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Failed to create recipe:", error);

    return Response.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}