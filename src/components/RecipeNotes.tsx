"use client";

import { useEffect, useState } from "react";

type RecipeNotesProps = {
    recipeId: string;
};

export default function RecipeNotes({
    recipeId,
}: RecipeNotesProps) {
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        async function loadNote() {
            try {
                const response = await fetch(
                    `/api/recipes/${recipeId}/notes`
                );

                if (response.status === 401) {
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to load note");
                }

                const data = await response.json();

                setNote(data?.content ?? "");
            } catch {
                setError("Failed to load your note.");
            } finally {
                setLoading(false);
            }
        }

        loadNote();
    }, [recipeId]);

    async function handleSave() {
        setSaving(true);
        setSaved(false);
        setError(null);

        try {
            const response = await fetch(
                `/api/recipes/${recipeId}/notes`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: note,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save note");
            }

            setSaved(true);
        } catch {
            setError("Failed to save your note.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="mt-8">
                <span className="loading loading-spinner loading-sm" />
            </div>
        );
    }

    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold mb-3">
                My Note
            </h2>

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a personal note about this recipe..."
                className="textarea textarea-bordered w-full min-h-32"
            />

            <div className="mt-3 flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || !note.trim()}
                    className="btn btn-primary"
                >
                    {saving ? "Saving..." : "Save Note"}
                </button>

                {saved && (
                    <span className="text-success text-sm">
                        Note saved!
                    </span>
                )}

                {error && (
                    <span className="text-error text-sm">
                        {error}
                    </span>
                )}
            </div>
        </section>
    );
}