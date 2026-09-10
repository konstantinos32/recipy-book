import Link from "next/link";
import  RecipesPage from "./recipes/page";

type HomeProps = {
    searchParams?: Promise<{ q?: string }>;
};

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <section className="hero rounded-box mb-16 bg-gradient-to-br from-primary/15 via-base-200 to-accent/15">
        <div className="hero-content text-center py-20">
          <div className="max-w-xl">

            <h1 className="text-4xl font-bold text-base-content">
              Discover Delicious Recipes
            </h1>
            <p className="py-6 text-base-content/70">
              Browse recipes from the community or add your own favorites
              to build a shared collection everyone can cook from.
            </p>
            <Link href="/recipes/create" className="btn btn-primary btn-lg">
              Add Your Recipe
            </Link>
          </div>
        </div>
      </section>
      <RecipesPage searchParams={searchParams} />
    </>
  );
}
