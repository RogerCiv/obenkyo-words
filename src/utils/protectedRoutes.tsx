import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const ProtectedRoutes = () => {
	// Cambiado: obtenemos el usuario y el estado de carga del contexto
	const { user, loading } = useAuth();
	if (loading) return <div>Loading...</div>;
	return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;