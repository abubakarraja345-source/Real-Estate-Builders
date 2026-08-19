import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-gray-500 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="underline">
        Back to home
      </Link>
    </main>
  );
}
