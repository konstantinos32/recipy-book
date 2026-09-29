import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import CreateRecipeForm from "./CreateRecipeForm";

export default async function CreateRecipePage() {
    const { data, error } = await auth.getSession();

    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <section className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-base-content">
                Create a New Recipe
            </h1>

            <p className="text-sm text-base-content/60 mb-6">
                Fill out the form below to create a new recipe.
            </p>

            <CreateRecipeForm />
        </section>
    );
}