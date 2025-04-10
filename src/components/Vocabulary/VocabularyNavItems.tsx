import { Link } from "react-router-dom"

const nokenLinks = [
  { to: "/nokens/noken-5", label: "Noken 5" },
  { to: "/nokens/noken-4", label: "Noken 4" },
  { to: "/nokens/noken-3", label: "Noken 3" },
  { to: "/nokens/noken-2", label: "Noken 2" },
  { to: "/nokens/noken-1", label: "Noken 1" },
]


export  function VocabularyNavItems() {
  return (
    <details>
      <summary>Vocabulario</summary>
      <ul className="p-2">
        {nokenLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
            PERRO
          </li>
        ))}
      </ul>
    </details>
  )
}
