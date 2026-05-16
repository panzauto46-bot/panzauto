export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <div className="h-full w-full animate-pulse bg-neutral-200" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 animate-pulse bg-neutral-200 rounded" />
        <div className="h-4 w-1/2 animate-pulse bg-neutral-200 rounded" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/3 animate-pulse bg-neutral-200 rounded" />
          <div className="h-4 w-1/4 animate-pulse bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden bg-neutral-100">
              <div className="h-full w-full animate-pulse bg-neutral-200" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-10 w-3/4 animate-pulse bg-neutral-200 rounded" />
              <div className="h-5 w-1/2 animate-pulse bg-neutral-200 rounded" />
            </div>

            <div className="h-10 w-1/3 animate-pulse bg-neutral-200 rounded" />

            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse bg-neutral-200 rounded" />
              <div className="h-4 w-5/6 animate-pulse bg-neutral-200 rounded" />
              <div className="h-4 w-4/6 animate-pulse bg-neutral-200 rounded" />
            </div>

            <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
              <div className="h-6 w-1/4 animate-pulse bg-neutral-200 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse bg-neutral-200 rounded" />
                <div className="h-4 w-full animate-pulse bg-neutral-200 rounded" />
                <div className="h-4 w-full animate-pulse bg-neutral-200 rounded" />
              </div>
            </div>

            <div className="h-12 w-full animate-pulse bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-200 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 animate-pulse bg-neutral-200 rounded" />
          <div className="h-3 w-full animate-pulse bg-neutral-200 rounded" />
          <div className="h-4 w-1/3 animate-pulse bg-neutral-200 rounded" />
        </div>
        <div className="h-8 w-8 animate-pulse bg-neutral-200 rounded" />
      </div>
    </div>
  );
}
