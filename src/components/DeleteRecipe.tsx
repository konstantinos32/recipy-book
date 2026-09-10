"use client";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";


type DeleteRecipeProps = {
    id: string;
};



export default function DeleteRecipe({ id }: DeleteRecipeProps) {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleDelete() {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?")
        if (!confirmed) {
            return
        }

        setError(null);
        startTransition(async () => {
            try {
                await fetch(`/api/recipes/${id}`, {
                    method: "DELETE",
                });
            } catch {
                setError("Failed to delete the recipe.");
                return;
            }
            redirect("/recipes");
        });
    }
    return (
        <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="btn btn-ghost btn-md text-error hover:bg-error/10"
      >
        {isPending
          ? "Deleting..."
          : "Delete"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
    )

}