import { Card, Skeleton } from "@/components/ui";

export function OrderDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Products Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex gap-4 pb-4 border-b last:border-b-0"
                >
                  <Skeleton className="w-20 h-20 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Summary Skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-7 w-48" />
            </div>

            <div className="space-y-3 mb-6">
              <div className="space-y-2 pb-3 border-b">
                <Skeleton className="h-4 w-20 mb-2" />
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </div>

            <Skeleton className="h-11 w-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}
