import RecipeNotes from "@/components/RecipeNotes";
import Link from "next/link";
import Image from "next/image";
import sql from "@/lib/db";
import DeleteRecipe from "@/components/DeleteRecipe";

const FOOD_PLACEHOLDER = "/images/food-placeholder.svg";

type RecipeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RecipeDetailsPage({
  params,
}: RecipeDetailsPageProps) {
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

  const imageSrc = recipe.image || FOOD_PLACEHOLDER;

  return (
    <section className="mx-auto max-w-2xl">
      <Link href="/recipes" className="btn btn-ghost btn-sm mb-4">
        ← Back to Recipes
      </Link>

      <div className="card bg-base-200 shadow-md overflow-hidden">
        <div className="relative h-56">
          <Image
            src={imageSrc}
            alt={recipe.title}
            fill
            unoptimized
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="badge badge-secondary mb-2">{recipe.category}</div>

            <h1 className="text-3xl font-bold drop-shadow">{recipe.title}</h1>
          </div>
        </div>

        <div className="card-body">
          <p className="text-base-content/70">{recipe.description}</p>

          <div className="divider" />

          <h2 className="text-lg font-semibold text-base-content">
            Ingredients
          </h2>

          <p className="text-base-content/80">
            {recipe.ingredients.join(", ")}
          </p>

          <div className="mt-6 flex items-center gap-4 text-sm text-base-content/60">
            <span>⏱ {recipe.duration} min</span>
            <span>🍽 {recipe.servings} servings</span>
          </div>

          <div className="card-actions mt-6 justify-between">
            <Link
              href={`/recipes/${recipe.id}/edit`}
              className="btn btn-ghost btn-md"
            >
              Edit
            </Link>

            <DeleteRecipe id={String(recipe.id)} />
          </div>

          <RecipeNotes recipeId={String(recipe.id)} />
        </div>
      </div>
    </section>
  );
}
