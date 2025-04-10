import { Github, Twitter } from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "./Logo"


export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-primary/70">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <Logo />
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <nav className="flex gap-4">
              <Link to="/about" className="text-sm text-foreground transition-colors hover:opacity-80">
                Sobre Nosotros
              </Link>
              <Link to="/contact" className="text-sm text-foreground transition-colors hover:opacity-80">
                Contacto
              </Link>
              <Link to="/privacy" className="text-sm text-foreground transition-colors hover:opacity-80">
                Privacidad
              </Link>
            </nav>

            <div className="flex gap-2">
              <a
                href="https://github.com/rogerciv"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center border-t border-border pt-6 text-center">
          <p className="text-sm text-foreground">
            © {currentYear} Noken Vocabulary. Vocabulario en español de los nokens.
          </p>
          <p className="mt-1 text-xs text-foreground">
            Desarrollado por{" "}
            <a
              href="https://rogercivdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-orange-500 transition-colors hover:opacity-80 hover:underline"
            >
              RogerCiv
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

