

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <aside>
        <img src="images/logo.jpeg" alt="Noken Vocabulary Logo" className="rounded-full" width="50" height="50" />
        <p className="font-bold">
          Noken Vocabulary
          <br />
          Vocabulario en español de los noken.
        </p>
        <p>Noken Vocabulary © {new Date().getFullYear()} -  <a href="https://rogercivdev.vercel.app/" target="_blank"  className="hover:underline hover:text-accent">RogerCiv</a> </p>
      </aside>
    </footer>
  )
}
