
'use client'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, type RecipeInput } from "@/lib/validations/recipe";

type RecipeFormProps = {
    defaultValues?: Partial<RecipeInput>;
    onSubmit: (data: RecipeInput) => void | Promise<void>;
    submitLabel?: string;
    cancelHref?: string;
};

export default function RecipeForm({
    defaultValues,
    onSubmit,
    submitLabel = "Submit",
    cancelHref = "/recipes",
}: RecipeFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RecipeInput>({
        resolver: zodResolver(recipeSchema),
        defaultValues,
    });

    return (
      <form
            className="card bg-base-200 shadow-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="card-body flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                Title
              </span>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Creamy Mushroom Risotto"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-error">{errors.title.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Description</span>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                placeholder="A short description of the recipe"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-sm text-error">{errors.description.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                Ingredients
              </span>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                placeholder="Ingredients and Steps for recipe"
                {...register("ingredients")}
              />
              {errors.ingredients && (
                <span className="text-sm text-error">{errors.ingredients.message}</span>
              )}
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  Duration (min)
                </span>
                <input
                  type="number"
                  min={1}
                  className="input input-bordered w-full"
                  placeholder="e.g. 30"
                  {...register("duration", { valueAsNumber: true })}
                />
                {errors.duration && (
                  <span className="text-sm text-error">{errors.duration.message}</span>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  Servings
                </span>
                <input
                  type="number"
                  min={1}
                  className="input input-bordered w-full"
                  placeholder="e.g. 4"
                  {...register("servings", { valueAsNumber: true })}
                />
                {errors.servings && (
                  <span className="text-sm text-error">{errors.servings.message}</span>
                )}
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">
                Category
              </span>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Dinner"
                {...register("category")}
              />
              {errors.category && (
                <span className="text-sm text-error">{errors.category.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Image URL <span className="text-sm text-base-content/60">(optional)</span></span>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://..."
                {...register("image")}
              />
              {errors.image && (
                <span className="text-sm text-error">{errors.image.message}</span>
              )}
            </label>
            <div className="card-actions mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : submitLabel}
              </button>
              <Link href={cancelHref} className="btn btn-outline">
                Cancel
              </Link>
            </div>
          </div>
        </form>
    );
}