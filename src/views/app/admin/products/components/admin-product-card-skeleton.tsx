import { Skeleton } from "@/components/ui/skeleton";

export const AdminProductCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="relative w-full h-48 bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />

        <div className="flex gap-2 mt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        <div className="flex justify-between mt-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>

        <Skeleton className="h-4 w-2/3" />

        <div className="flex justify-between items-center mt-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};
