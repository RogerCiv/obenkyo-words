import { CardNokenLevels } from "@/components";
import { niveles } from "@/data/nokens";

export default function NokensPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-14 xl:py-0">
      <h1 className="text-4xl font-bold mb-16">Selecciona tu Noken</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
        {niveles.map((nivel) => (
          <CardNokenLevels key={nivel.title} levelCard={nivel} />
        ))}
      </div>
    </div>
  );
}