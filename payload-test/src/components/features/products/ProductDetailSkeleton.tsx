export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="h-10 w-40 bg-muted rounded mb-4 animate-pulse" />

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-square bg-muted rounded-lg animate-pulse mb-6" />

          <div className="space-y-6">
            <div>
              <div className="h-10 w-3/4 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-6 w-1/4 bg-muted rounded animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="h-12 w-1/2 bg-muted rounded animate-pulse" />
              <div className="h-8 w-1/3 bg-muted rounded animate-pulse" />
            </div>

            <div className="h-8 w-24 bg-muted rounded animate-pulse" />

            <div>
              <div className="h-8 w-32 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-20 w-full bg-muted rounded animate-pulse" />
            </div>

            <div>
              <div className="h-8 w-24 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-6 w-1/2 bg-muted rounded mb-1 animate-pulse" />
              <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-background border-t p-4 mt-8">
        <div className="container mx-auto flex items-center gap-4">
          <div className="h-12 w-40 bg-muted rounded animate-pulse" />
          <div className="h-12 flex-1 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
