import { Link } from "react-router-dom";

export default function NokensPage() {
  const niveles = [
    { level: "noken-5", label: "Noken 5" },
    { level: "noken-4", label: "Noken 4" },
    { level: "noken-3", label: "Noken 3" },
    { level: "noken-2", label: "Noken 2" },
    { level: "noken-1", label: "Noken 1" },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Selecciona tu Noken</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {niveles.map((nivel) => (
          <div key={nivel.level} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{nivel.label}</h2>
              <div className="card-actions justify-end">
                <Link to={`/nokens/${nivel.level}`} className="btn btn-primary">
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}