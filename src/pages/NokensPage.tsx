import CardNokenLevels from "../components/CardNokenLevels";

export default function NokensPage() {
  const niveles = [
    { level: "noken-5", title: "Noken 5", image: "images/nokens/noken5.jpg", description: "Corresponde al nivel A1 del MCER y evalúa las habilidades básicas de comprensión y expresión" },
    { level: "noken-4", title: "Noken 4", image: "images/nokens/noken4.jpg", description: "Corresponde al nivel A2 del MCER y evalúa un conocimiento elemental del idioma" },
    { level: "noken-3", title: "Noken 3", image: "images/nokens/noken3.jpg", description: "Corresponde al nivel B1 del MCER y evalúa la capacidad de comprender y utilizar el idioma en diversas situaciones" },
    { level: "noken-2", title: "Noken 2", image: "images/nokens/noken2.jpg", description: "Corresponde al nivel B2 del MCER y evalúa la capacidad de comprender textos complejos y participar en conversaciones detalladas" },
    { level: "noken-1", title: "Noken 1", image: "images/nokens/noken1.jpg", description: "Corresponde al nivel C1 del MCER y evalúa la capacidad de facilitar negociaciones y presentaciones. El examen se divide en tres partes: escritura y vocabulario, comprensión auditiva y gramática, y comprensión de lectura." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-14 xl:py-0">
      <h1 className="text-4xl font-bold mb-6">Selecciona tu Noken</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
        {niveles.map((nivel) => (
          <CardNokenLevels key={nivel.title} levelCard={nivel} />
        ))}
      </div>
    </div>
  );
}