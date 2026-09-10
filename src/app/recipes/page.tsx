import { featuredRecipes } from "@/data/mocksRecipes"; 
import RecipeList from "@/components/RecipeList";

//ADD API CALL TO FETCH RECIPES HERE 
// replace featuredRecipes with data fetched from the API when available

type RecipesPageProps = {
    searchParams?: Promise<{ q?: string }>;
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
    const { q } = (await searchParams) ?? {};
    const query = q?.trim().toLowerCase() ?? "";

    const recipes = query
        ? featuredRecipes.filter((recipe) =>
              [recipe.title, recipe.description, recipe.category]
                  .filter(Boolean)
                  .some((field) => field!.toLowerCase().includes(query))
          )
        : featuredRecipes;

    return (
        <section>
          <RecipeList recipes={recipes} isSearching={Boolean(query)} />
        </section>
    );
}