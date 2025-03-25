import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="bg-amber-200 flex flex-col">HomePage
      <h2>
        Bienvenido { user ? user.email : ' invitado' }
      </h2>
      { !user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  )
}
