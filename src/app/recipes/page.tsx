
import { auth } from "@/lib/auth/server";
import sql from "@/lib/db";
import RecipeList from "@/components/RecipeList";
import type { Recipe } from "@/types/recipe";

type RecipesPageProps = {
    searchParams?: Promise<{ q?: string }>;
};

export default async function RecipesPage({
    searchParams,
}: RecipesPageProps) {
    // Check the current logged-in user
    

    // Get recipes directly from the database
    const recipesFromDb = await sql`
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
        ORDER BY id DESC
    `;

    // Convert database data into the shape our frontend expects
    const recipes: Recipe[] = recipesFromDb.map((recipe) => ({
        id: String(recipe.id),
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients.join(", "),
        duration: recipe.duration,
        servings: recipe.servings,
        category: recipe.category,
        image: recipe.image ?? undefined,
    }));

    const { q } = (await searchParams) ?? {};
    const query = q?.trim().toLowerCase() ?? "";

    // Filter the real database recipes when searching
    const filteredRecipes = query
        ? recipes.filter((recipe) =>
              [recipe.title, recipe.description, recipe.category]
                  .filter(Boolean)
                  .some((field) =>
                      field.toLowerCase().includes(query)
                  )
          )
        : recipes;

    return (
        <section>
            <RecipeList
                recipes={filteredRecipes}
                isSearching={Boolean(query)}
            />
        </section>
    );
}
