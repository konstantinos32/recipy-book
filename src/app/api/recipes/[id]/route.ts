import sql from "@/lib/db";
import { recipeSchema } from "@/lib/validations/recipe";
import { auth } from "@/lib/auth/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const [recipe] = await sql`
            SELECT
                id,
                title,
                description,
                ingredients,
                duration,
                servings,
                category,
                image
            FROM recipes
            WHERE id = ${id}
        `;

        if (!recipe) {
            return Response.json(
                { error: "Recipe not found" },
                { status: 404 }
            );
        }

        return Response.json(recipe);
    } catch (error) {
        console.error("Failed to fetch recipe:", error);

        return Response.json(
            { error: "Failed to fetch recipe" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check who is logged in
        const { data, error } = await auth.getSession();

        if (error || !data?.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get the logged-in user's ID
        const userId = data.user.id;

        // Get the recipe ID from the URL
        const { id } = await params;

        // Delete only if the recipe belongs to this user
        const [deletedRecipe] = await sql`
            DELETE FROM recipes
            WHERE id = ${id}
            AND user_id = ${userId}
            RETURNING id
        `;

        if (!deletedRecipe) {
            return Response.json(
                { error: "Recipe not found or you are not the owner" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "Recipe deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete recipe:", error);

        return Response.json(
            { error: "Failed to delete recipe" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check who is logged in
        const { data, error } = await auth.getSession();

        if (error || !data?.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get the logged-in user's ID
        const userId = data.user.id;

        // Get the recipe ID from the URL
        const { id } = await params;

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

        // Convert ingredients string into an array
        const ingredientsArray = ingredients
            .split(",")
            .map((ingredient) => ingredient.trim())
            .filter(Boolean);

        // Update only if the recipe belongs to the logged-in user
        const [updatedRecipe] = await sql`
            UPDATE recipes
            SET
                title = ${title},
                description = ${description},
                ingredients = ${ingredientsArray},
                duration = ${duration},
                servings = ${servings},
                category = ${category},
                image = ${image || null}
            WHERE id = ${id}
            AND user_id = ${userId}
            RETURNING *
        `;

        if (!updatedRecipe) {
            return Response.json(
                { error: "Recipe not found or you are not the owner" },
                { status: 404 }
            );
        }

        return Response.json(updatedRecipe);
    } catch (error) {
        console.error("Failed to update recipe:", error);

        return Response.json(
            { error: "Failed to update recipe" },
            { status: 500 }
        );
    }
}