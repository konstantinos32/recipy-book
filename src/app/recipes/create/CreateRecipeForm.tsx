"use client";

import { useRouter } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import type { RecipeInput } from "@/lib/validations/recipe";

export default function CreateRecipeForm() {
    const router = useRouter();

    async function handleCreate(data: RecipeInput) {
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Failed to create recipe");
            return;
        }

        router.push("/recipes");
    }

    return (
        <RecipeForm
            submitLabel="Save Recipe"
            onSubmit={handleCreate}
        />
    );
}