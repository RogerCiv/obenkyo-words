import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 gap-6 md:gap-10">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
        <Skeleton className="relative w-full max-w-xl aspect-square md:aspect-video mb-4 rounded-lg shadow-sm transition-colors duration-300 p-3 bg-gray-200">
          {/* Simula el Card */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between p-3">
            <Skeleton className="size-10 rounded-full bg-gray-300 ml-10" />
            <Skeleton className="size-10 rounded-full bg-gray-300 mr-10" />
          </div>
        </Skeleton>
        {/* Se simulan los botones con Skeleton imitando la forma original */}
        <div className="flex space-x-4 mt-4">
          <Skeleton className="h-10 w-24 rounded bg-gray-200" />
          <Skeleton className="h-10 w-24 rounded bg-gray-200" />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          {/* Simula etiqueta */}
          <Skeleton className="h-14 w-72 bg-gray-200" />
          <Skeleton className="h-14 w-72 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
