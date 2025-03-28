
import SkeletonCard from './SkeletonCard'

interface LoadingSkeletonProps {
  displayLevel: string
}

export default function LoadingSkeleton(props: LoadingSkeletonProps) {
  const { displayLevel } = props
  return (
    <section className="min-h-screen container mx-auto flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
        Cargando Noken {displayLevel}...
      </h1>
      <div className="flex w-full flex-col lg:flex-row gap-4 items-center">
        <div className="w-full lg:w-1/2">
          {/* Skeleton para VocabularyCardDisplay */}
          <SkeletonCard />
        </div>
        <div className="w-full lg:w-1/2">
          {/* Skeleton para la lista de palabras simulada */}
          <div className="bg-base-200 rounded-box shadow-md p-4">
            <div className="skeleton h-6 w-40 mb-4"></div>
            <ul className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-14 w-full"></div>
              ))}
            </ul>
          </div>
          {/* Skeleton para paginación */}
          <div className="mt-4">
            <div className="skeleton h-8 w-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
