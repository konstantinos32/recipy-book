"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import RecipeForm from "@/components/RecipeForm";
import type { RecipeInput } from "@/lib/validations/recipe";

type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    duration: number;
    servings: number;
    category: string;
    image: string | null;
};

export default function EditRecipePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadRecipe() {
            try {
                const response = await fetch(`/api/recipes/${params.id}`);

                if (!response.ok) {
                    setError("Recipe not found");
                    return;
                }

                const data = await response.json();
                setRecipe(data);
            } catch {
                setError("Failed to load recipe");
            } finally {
                setLoading(false);
            }
        }

        loadRecipe();
    }, [params.id]);

    async function handleUpdate(data: RecipeInput) {
        const response = await fetch(`/api/recipes/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            setError("Failed to update recipe");
            return;
        }

        router.push(`/recipes/${params.id}`);
    }

    if (loading) {
        return (
            <section className="mx-auto max-w-2xl p-4 text-center">
                <p className="text-base-content/60">
                    Loading recipe...
                </p>
            </section>
        );
    }

    if (error || !recipe) {
        return (
            <section className="mx-auto max-w-2xl p-4 text-center">
                <h1 className="text-2xl font-bold text-base-content">
                    Recipe not found
                </h1>

                <p className="mt-2 text-base-content/60">
                    We couldn&apos;t find the recipe you&apos;re looking for.
                </p>

                <Link href="/recipes" className="btn btn-primary mt-6">
                    Back to Recipes
                </Link>
            </section>
        );
    }

    const defaultValues: RecipeInput = {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients.join(", "),
        duration: recipe.duration,
        servings: recipe.servings,
        category: recipe.category,
        image: recipe.image ?? "",
    };

    return (
        <section className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-base-content">
                Edit Recipe
            </h1>

            <p className="text-sm text-base-content/60 mb-6">
                Update the details of this recipe.
            </p>

            <RecipeForm
                defaultValues={defaultValues}
                submitLabel="Update Recipe"
                cancelHref={`/recipes/${recipe.id}`}
                onSubmit={handleUpdate}
            />
        </section>
    );
}