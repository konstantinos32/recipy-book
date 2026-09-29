export default function Loading() {
    return (
        <section className="mx-auto max-w-2xl">
            <div className="card bg-base-200 shadow-md">
                <div className="card-body items-center justify-center min-h-64">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            </div>
        </section>
    );
}