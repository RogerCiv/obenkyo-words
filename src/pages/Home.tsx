import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <section className="hero min-h-[94.5vh] bg-gradient-to-br from-base-200 to-base-300">
      <div className="hero-content max-w-7xl mx-auto px-4 py-16 flex-col lg:flex-row-reverse gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 shadow-2xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
          <img src="images/hero-image.jpg" alt="Aprendizaje de Nokens" className="w-full h-full object-cover" />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Domina los <span className="text-primary">Nokens</span>
          </h1>
          <p className="py-6 text-lg md:text-xl text-base-content/80 max-w-xl mx-auto lg:mx-0">
            Bienvenido a tu web de vocabulario de nokens. Aprende de manera moderna y elegante, y expande tu
            conocimiento con cada token.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/register" className="btn btn-primary btn-lg">
              Comienza a Aprender
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link to="/nokens" className="btn btn-outline btn-lg">
              Nokens
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

