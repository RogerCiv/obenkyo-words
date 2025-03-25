import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-6xl font-bold">Domina los Nokens</h1>
          <p className="py-6 text-lg">
            Bienvenido a tu web de vocabulario de nokens. Aprende de manera moderna y elegante, y expande tu conocimiento con cada token.
          </p>
          <button className="btn btn-primary"><Link to='/nokens'>Comienza a Aprender</Link></button>
        </div>
        <div className="w-full max-w-2xl shadow-2xl rounded-lg overflow-hidden">
          <img src="/hero-image.jpg" alt="Hero" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
