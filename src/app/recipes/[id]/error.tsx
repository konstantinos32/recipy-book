"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <section className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold">
                Something went wrong
            </h2>

            <p className="mt-2 text-base-content/60">
                We couldn't load this recipe.
            </p>

            <button
                type="button"
                onClick={() => reset()}
                className="btn btn-primary mt-6"
            >
                Try again
            </button>
        </section>
    );
}