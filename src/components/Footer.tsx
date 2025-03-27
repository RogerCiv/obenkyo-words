

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <aside>
        <img src="/logo.jpeg" alt="Noken Vocabulary Logo" className="rounded-full" width="50" height="50" />
        <p className="font-bold">
          Noken Vocabulary
          <br />
          Vocabulario en español de los noken.
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  )
}
