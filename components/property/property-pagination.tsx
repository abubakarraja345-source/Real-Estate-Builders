import Link from "next/link";

function hrefForPage(searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams);
  if (page <= 1) params.delete("page");
  else params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/properties?${qs}` : "/properties";
}

export function PropertyPagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-6 pt-4" aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefForPage(searchParams, page - 1)} className="text-sm font-medium text-navy hover:text-champagne">
          ← Previous
        </Link>
      ) : (
        <span className="text-sm font-medium text-navy/30">← Previous</span>
      )}
      <span className="text-sm text-site-slate">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={hrefForPage(searchParams, page + 1)} className="text-sm font-medium text-navy hover:text-champagne">
          Next →
        </Link>
      ) : (
        <span className="text-sm font-medium text-navy/30">Next →</span>
      )}
    </nav>
  );
}
