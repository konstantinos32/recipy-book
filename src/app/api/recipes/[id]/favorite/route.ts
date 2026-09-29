import sql from "@/lib/db";
import { auth } from "@/lib/auth/server";

// GET — check if the current user has favorited this recipe
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { data, error } = await auth.getSession();

        if (error || !data?.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = data.user.id;
        const { id } = await params;

        const [favorite] = await sql`
            SELECT *
            FROM favorites
            WHERE user_id = ${userId}
            AND recipe_id = ${id}
        `;

        return Response.json({
            favorite: Boolean(favorite),
        });
    } catch (error) {
        console.error("Failed to check favorite:", error);

        return Response.json(
            { error: "Failed to check favorite" },
            { status: 500 }
        );
    }
}

// POST — add the recipe to favorites
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { data, error } = await auth.getSession();

        if (error || !data?.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = data.user.id;
        const { id } = await params;

        const [favorite] = await sql`
            INSERT INTO favorites (
                user_id,
                recipe_id
            )
            VALUES (
                ${userId},
                ${id}
            )
            ON CONFLICT (user_id, recipe_id)
            DO NOTHING
            RETURNING *
        `;

        return Response.json({
            favorite: true,
            data: favorite ?? null,
        });
    } catch (error) {
        console.error("Failed to add favorite:", error);

        return Response.json(
            { error: "Failed to add favorite" },
            { status: 500 }
        );
    }
}

// DELETE — remove the recipe from favorites
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { data, error } = await auth.getSession();

        if (error || !data?.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = data.user.id;
        const { id } = await params;

        await sql`
            DELETE FROM favorites
            WHERE user_id = ${userId}
            AND recipe_id = ${id}
        `;

        return Response.json({
            favorite: false,
        });
    } catch (error) {
        console.error("Failed to remove favorite:", error);

        return Response.json(
            { error: "Failed to remove favorite" },
            { status: 500 }
        );
    }
}