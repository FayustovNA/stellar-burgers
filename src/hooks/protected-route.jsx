import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isUnAuth = false }) => {
    const location = useLocation();
    const { email } = useSelector(state => state.auth);
    // const { email } = useAuth();

    if (!email && !isUnAuth) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;

}

export { ProtectedRoute }