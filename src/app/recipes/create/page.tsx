'use client'
import { useRouter } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import type { RecipeInput } from "@/lib/validations/recipe";

export default function CreateRecipePage() {
    const router = useRouter();

    async function handleCreate(data: RecipeInput) {
        //REPLACE THIS WITH ACTUAL API CALL TO CREATE THE RECIPE
        await fetch("/api/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        router.push("/recipes");
    }

    return(

        <section className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-base-content">Create a New Recipe</h1>
          <p className="text-sm text-base-content/60 mb-6">Fill out the form below to create a new recipe.</p>
          <RecipeForm submitLabel="Save Recipe" onSubmit={handleCreate} />
        </section>
    )
}