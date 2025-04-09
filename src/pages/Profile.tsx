import { StudyCalendar } from "@/components";
import { NokenCharts } from "@/components/NokenCharts";

import { useAuth } from "@/hooks/useAuth";
import useVocabularyStatus from "@/hooks/useVocabularyStatus";

export default function Profile() {
  const { user } = useAuth();
  const { studyDays } = useVocabularyStatus();
  


  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
          <h1 className="text-3xl font-bold mb-6">Bienvenido, {user?.email}</h1>
          <p className="mb-8 text-gray-600">
            Aquí encontrarás un resumen de tu progreso: el calendario muestra tus días de estudio y las gráficas indican el avance por nivel, mostrando palabras aprendidas, no aprendidas y por aprender.
          </p>
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-semibold mb-4">Calendario de Estudio</h2>
              <StudyCalendar dates={studyDays} />
            </div>
            <div className="bg-white shadow rounded p-4 col-span-2">
              <h2 className="text-xl font-semibold mb-4">Estadísticas de Progreso</h2>
              <NokenCharts />
            </div>
          </div>
    </div>
  )
}
