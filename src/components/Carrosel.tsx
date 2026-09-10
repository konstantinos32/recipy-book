'use client';
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/types/recipe";


const CARDS_PER_SLIDE = 6;

function chunk(recipes: Recipe[], size: number): Recipe[][] {
    const pages: Recipe[][] = [];
    for (let i = 0; i < recipes.length; i += size) {
        pages.push(recipes.slice(i, i + size));
    }
    return pages;
}

type CarroselProps = {
    recipes: Recipe[];
};
export default function Carrosel({ recipes }: CarroselProps) {
    const pages = chunk(recipes, CARDS_PER_SLIDE);

    return (
        <div>
            <div className="carousel w-full rounded-box">
                {pages.map((page, index) => (
                    <div
                        key={index}
                        id={`slide-${index}`}
                        className="carousel-item w-full"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                            {page.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex w-full justify-center gap-2 pt-4">
                {pages.map((_, index) => (
                    <a
                        key={index}
                        href={`#slide-${index}`}
                        className="btn btn-xs btn-circle"
                    >
                        {index + 1}
                    </a>
                ))}
            </div>
        </div>
    );
}   