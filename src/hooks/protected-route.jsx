import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./use-auth";

const ProtectedRoute = ({ children, isUnAuth = false }) => {
    const location = useLocation();
    const { email } = useAuth();

    if (!email && !isUnAuth) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;

}

export { ProtectedRoute }