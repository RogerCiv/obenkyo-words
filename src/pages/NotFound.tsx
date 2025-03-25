import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-6xl font-bold mb-4">404 - Página No Encontrada</h1>
      <p className="mb-6">La página que buscas no existe.</p>
      <button className="btn btn-primary">
        <Link to="/">Volver a Home</Link>
      </button>
    </div>
  );
}