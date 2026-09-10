'use client'
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export function Header(){
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isCreatePage = pathname.startsWith("/recipes/create");

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("q", value);
        } else {
            params.delete("q");
        }
        router.replace(params.size ? `${pathname}?${params.toString()}` : pathname);
    }

    return (
      <div className="navbar sticky top-0 z-20 gap-4 bg-base-200/95 backdrop-blur shadow-sm px-6">
        <Link href="/" className="shrink-0 text-xl font-semibold text-primary">
          📖 Recipes Book
        </Link>

        {!isCreatePage && (
          <label className="input input-bordered input-sm mx-auto flex w-full max-w-md flex-1 items-center gap-2">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search recipes..."
              className="w-full grow"
              defaultValue={searchParams.get("q") ?? ""}
              onChange={handleSearchChange}
            />
          </label>
        )}

        {!isCreatePage && (
          <Link href="/recipes/create" className="btn btn-primary btn-sm shrink-0">
            Add Recipe
          </Link>
        )}
      </div>
    );
}