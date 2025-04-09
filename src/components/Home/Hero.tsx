import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Hero() {

  return (
    <section className="py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-base-100 to-base-200">
      <div className="container px-4 mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className={`flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-700 `}
          >
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              日本語 JLPT
            </div>

            <h1 className="mt-6 mb-4 text-4xl font-bold text-pretty md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Estudia con Tarjetas: Vocabulario Noken
            </h1>

            <p className="mb-8 max-w-xl text-base-content/70 text-lg md:text-xl">
              Prepara cada nivel del examen Noken (JLPT) con nuestro sistema intuitivo de tarjetas que te ayuda a dominar el vocabulario esencial.
            </p>

            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg text-foreground font-semibold"
              >
                <Link to="/register">Comienza a aprender</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 hover:border-primary/70 transition-all duration-300 group text-foreground font-semibold"
              >
                <Link to="/nokens" className="flex items-center gap-2">
                  Nokens
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="avatar">
                    <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={`/placeholder.svg?height=32&width=32&text=${i}`} alt={`U ${i}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-4 text-sm text-base-content/70">
                <span className="font-semibold text-primary">+2,500</span> estudiantes activos
              </div>
            </div> */}
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl opacity-30 -z-10 transform -rotate-6"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/hero-image.jpg"
                alt="Aprendizaje de japonés con Nokens"
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

