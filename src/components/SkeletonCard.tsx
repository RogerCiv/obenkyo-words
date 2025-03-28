export default function SkeletonCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 gap-6 md:gap-10">
      <div className="w-full max-w-3xl mx-auto">
        {/* Se reemplaza el borde fijo por borde transparente y efecto skeleton */}
        <div className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[2/1] mb-4 md:mb-8 rounded-lg shadow-lg transition-colors duration-300 p-3 skeleton">
          {/* Simula el Card */}
          <div className="skeleton w-full h-full"></div>
        </div>
        <div className="flex items-center justify-center gap-4">
          {/* Simula los botones de navegación o KnowledgeButtons */}
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-10 w-24"></div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          {/* Simula la etiqueta del índice de tarjeta */}
          <div className="skeleton h-6 w-42"></div>
        </div>
      </div>
    </div>
  );
}
