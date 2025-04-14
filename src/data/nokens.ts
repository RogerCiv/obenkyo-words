export interface NokenLevel {
  level: string;
  title: string;
  image: string;
  description: string;
}

export const niveles: NokenLevel[] = [
  {
    level: "noken-5",
    title: "Noken 5",
    image: "images/nokens/noken5.webp",
    description: "Corresponde al nivel A1 del MCER y evalúa las habilidades básicas de comprensión y expresión"
  },
  {
    level: "noken-4",
    title: "Noken 4",
    image: "images/nokens/noken4.webp",
    description: "Corresponde al nivel A2 del MCER y evalúa un conocimiento elemental del idioma"
  },
  {
    level: "noken-3",
    title: "Noken 3",
    image: "images/nokens/noken3.webp",
    description: "Corresponde al nivel B1 del MCER y evalúa la capacidad de comprender y utilizar el idioma en diversas situaciones"
  },
  {
    level: "noken-2",
    title: "Noken 2",
    image: "images/nokens/noken2.webp",
    description: "Corresponde al nivel B2 del MCER y evalúa la capacidad de comprender textos complejos y participar en conversaciones detalladas"
  },
  {
    level: "noken-1",
    title: "Noken 1",
    image: "images/nokens/noken1.webp",
    description: "Corresponde al nivel C1 del MCER y evalúa la capacidad de facilitar negociaciones y presentaciones. El examen se divide en tres partes: escritura y vocabulario, comprensión auditiva y gramática, y comprensión de lectura."
  }
];
