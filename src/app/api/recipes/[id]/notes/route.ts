import sql from "@/lib/db";
import { auth } from "@/lib/auth/server";

// GET — get the current user's note for this recipe
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

        const [note] = await sql`
            SELECT *
            FROM notes
            WHERE user_id = ${userId}
            AND recipe_id = ${id}
        `;

        return Response.json(note ?? null);
    } catch (error) {
        console.error("Failed to fetch note:", error);

        return Response.json(
            { error: "Failed to fetch note" },
            { status: 500 }
        );
    }
}

// PUT — create or update the current user's note
export async function PUT(
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
        const { content } = await request.json();

        if (!content?.trim()) {
            return Response.json(
                { error: "Note cannot be empty" },
                { status: 400 }
            );
        }

        const [note] = await sql`
            INSERT INTO notes (
                user_id,
                recipe_id,
                content
            )
            VALUES (
                ${userId},
                ${id},
                ${content.trim()}
            )
            ON CONFLICT (user_id, recipe_id)
            DO UPDATE SET
                content = EXCLUDED.content,
                updated_at = NOW()
            RETURNING *
        `;

        return Response.json(note);
    } catch (error) {
        console.error("Failed to save note:", error);

        return Response.json(
            { error: "Failed to save note" },
            { status: 500 }
        );
    }
}