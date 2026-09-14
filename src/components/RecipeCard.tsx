'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Recipe } from "@/types/recipe";

type RecipeCardProps = {
    recipe: Recipe;
}

const FOOD_PLACEHOLDER = "/images/food-placeholder.svg";

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [imageSrc, setImageSrc] = useState(recipe.image || FOOD_PLACEHOLDER);

    return (
        <div className="card bg-base-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden">
          <div className="relative h-32">
            <Image
              src={imageSrc}
              alt={recipe.title}
              fill
              unoptimized
              className="object-cover"
              onError={() => setImageSrc(FOOD_PLACEHOLDER)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="badge badge-secondary absolute bottom-2 left-2">{recipe.category}</div>
          </div>
          <div className="card-body">
                  <h3 className="card-title">{recipe.title}</h3>
                  <p className="text-base-content/70">{recipe.description}</p>
                  <div className="card-actions items-center justify-between mt-4">
                    <span className="text-sm text-base-content/60">
                      ⏱ {recipe.duration} min · 🍽 {recipe.servings}
                    </span>
                    <Link href={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline btn-primary">
                      View Recipe
                    </Link>
                  </div>
                </div>
        </div>
    )
}