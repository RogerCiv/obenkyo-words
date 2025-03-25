import { Link } from "react-router-dom"

const nokenLinks = [
  { to: "/noken-5", label: "Noken 5" },
  { to: "/noken-4", label: "Noken 4" },
  { to: "/noken-3", label: "Noken 3" },
  { to: "/noken-2", label: "Noken 2" },
  { to: "/noken-1", label: "Noken 1" },
]


export default function VocabularyNavItems() {
  return (
    <details>
      <summary>Vocabulario</summary>
      <ul className="p-2">
        {nokenLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
