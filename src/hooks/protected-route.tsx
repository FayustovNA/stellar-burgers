import { useLocation, Navigate } from "react-router-dom";
import { FC } from "react";
// import { useAuth } from "./use-auth";
import { useSelector } from '../services/hooks';

interface IProtectedRoute {
    children: JSX.Element | any;
    isUnAuth?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({
    children,
    isUnAuth = false
}) => {
    const location = useLocation();
    const { email } = useSelector(state => state.auth);
    // const { email } = useAuth();

    if (!email && !isUnAuth) {
        return <Navigate to='/login' state={{ from: location }
        } replace />
    }

    return children;

}

export default ProtectedRoute;