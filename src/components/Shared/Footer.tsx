import { Github, Twitter } from "lucide-react"
import { Link } from "react-router-dom"


export  function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-blue-500/60">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <img
              src="/images/logo.jpeg"
              alt="Noken Vocabulary Logo"
              className="h-12 w-12 rounded-full object-cover shadow-sm"
            />
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Noken Vocabulary</h3>
              <p className="text-sm text-muted-foreground">Vocabulario en español de los noken</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row">
            <nav className="flex gap-4">
              <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Sobre Nosotros
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contacto
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacidad
              </Link>
            </nav>

            <div className="flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Noken Vocabulary. Todos los derechos reservados.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Desarrollado por{" "}
            <a
              href="https://rogercivdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              RogerCiv
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

