
import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to='/' className="flex items-center gap-2">
      <img
        src="/images/logo.jpeg"
        alt="Noken Vocabulary Logo"
        className="size-12 rounded-full object-cover shadow-sm"
      />
      <span className="text-lg font-semibold tracking-tighter">
        Noken Vocabulary
      </span>
    </Link>
  )
}
