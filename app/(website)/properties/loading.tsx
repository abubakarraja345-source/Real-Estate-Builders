export default function LoadingProperties() {
  return (
    <main>
      <div className="-mt-20 h-[420px] animate-pulse bg-navy" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-sm border border-navy/10">
              <div className="aspect-[4/3] bg-navy/10" />
              <div className="flex flex-col gap-3 p-5">
                <div className="h-3 w-1/3 rounded bg-navy/10" />
                <div className="h-4 w-3/4 rounded bg-navy/10" />
                <div className="h-3 w-1/2 rounded bg-navy/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
