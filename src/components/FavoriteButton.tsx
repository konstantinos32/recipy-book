"use client";

import { useEffect, useState } from "react";

type FavoriteButtonProps = {
    recipeId: string;
};

export default function FavoriteButton({
    recipeId,
}: FavoriteButtonProps) {
    const [favorite, setFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFavorite() {
            try {
                const response = await fetch(
                    `/api/recipes/${recipeId}/favorite`
                );

                if (response.status === 401) {
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to load favorite");
                }

                const data = await response.json();

                setFavorite(data.favorite);
            } catch {
                setError("Failed to load favorite.");
            } finally {
                setLoading(false);
            }
        }

        loadFavorite();
    }, [recipeId]);

    async function handleToggle() {
        setSaving(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/recipes/${recipeId}/favorite`,
                {
                    method: favorite ? "DELETE" : "POST",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update favorite");
            }

            const data = await response.json();

            setFavorite(data.favorite);
        } catch {
            setError("Failed to update favorite.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <button
                type="button"
                disabled
                className="btn btn-ghost btn-md"
            >
                ...
            </button>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleToggle}
                disabled={saving}
                className="btn btn-ghost btn-md"
            >
                {favorite ? "❤️ Favorited" : "🤍 Favorite"}
            </button>

            {error && (
                <p className="mt-1 text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    );
}