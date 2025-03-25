import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
	// Cambiado: obtenemos el usuario del contexto
	const { user } = useAuth();
	return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;