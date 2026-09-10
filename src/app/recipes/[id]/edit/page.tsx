
'use client'
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { featuredRecipes } from "@/data/mocksRecipes";
import RecipeForm from "@/components/RecipeForm";
import type { RecipeInput } from "@/lib/validations/recipe";

export default function EditRecipePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const recipe = featuredRecipes.find((r) => r.id === params.id);

    if (!recipe) {
        return (
            <section className="mx-auto max-w-2xl p-4 text-center">
                <h1 className="text-2xl font-bold text-base-content">Recipe not found</h1>
                <p className="mt-2 text-base-content/60">
                  We couldn&apos;t find the recipe you&apos;re looking for.
                </p>
                <Link href="/recipes" className="btn btn-primary mt-6">
                  Back to Recipes
                </Link>
            </section>
        );
    }

    async function handleUpdate(data: RecipeInput) {
        //REPLACE THIS WITH ACTUAL API CALL TO UPDATE THE RECIPE
        await fetch(`/api/recipes/${recipe!.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        router.push(`/recipes/${recipe!.id}`);
    }

    return (
        <section className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-base-content">Edit Recipe</h1>
          <p className="text-sm text-base-content/60 mb-6">Update the details of this recipe.</p>
          <RecipeForm
            defaultValues={recipe}
            submitLabel="Update Recipe"
            cancelHref={`/recipes/${recipe.id}`}
            onSubmit={handleUpdate}
          />
        </section>
    );
}