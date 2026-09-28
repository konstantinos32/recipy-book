import sql from "@/lib/db";
import { recipeSchema } from "@/lib/validations/recipe";
import { auth } from "@/lib/auth/server";

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
        // Check who is currently logged in
        const { data, error } = await auth.getSession();

        if (error || !data?.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get the logged-in user's ID
        const userId = data.user.id;


        // Get the recipe data sent by the form
        const body = await request.json();

        // Validate the recipe data
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

        // Convert the ingredients string into an array
        const ingredientsArray = ingredients
            .split(",")
            .map((ingredient) => ingredient.trim())
            .filter(Boolean);

        // Save the recipe together with the logged-in user's ID
        const [recipe] = await sql`
            INSERT INTO recipes (
                title,
                category,
                duration,
                servings,
                ingredients,
                description,
                image,
                user_id
            )
            VALUES (
                ${title},
                ${category},
                ${duration},
                ${servings},
                ${ingredientsArray},
                ${description},
                ${image || null},
                ${userId}
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