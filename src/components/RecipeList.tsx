import { Recipe } from "@/types/recipe";
import Link from "next/link";
import  Carrosel from "./Carrosel";


type RecipeListProps = {
    recipes: Recipe[];
    isSearching?: boolean;
}

export default function RecipeList({ recipes, isSearching }: RecipeListProps) {
    if(recipes.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 rounded-box border border-dashed border-base-300 bg-base-200 p-12 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
                  🍽️
                </span>
                <h2 className="text-lg font-semibold text-base-content">
                  {isSearching ? "No recipes found" : "No recipes yet"}
                </h2>

                <p className="max-w-sm text-sm text-base-content/60">
                  {isSearching
                    ? "Try a different search term."
                    : "Your collection is empty. Add your first recipe to get it started."}
                </p>

                {!isSearching && (
                  <Link href="/recipes/create" className="btn btn-primary btn-sm mt-2">
                    Add Your Recipe
                  </Link>
                )}
            </div>
        );
    }

    return (

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-base-content">
            {isSearching ? "Search Results" : "Featured Recipes"}
          </h2>
          <Carrosel recipes={recipes} />
        </section>
    );
}