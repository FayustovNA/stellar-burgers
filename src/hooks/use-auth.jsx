import { useSelector } from "react-redux";

export function useAuth() {
    const { name, email, token } = useSelector(state => state.auth);

    return {
        isUserCheked: !!email,
        email,
        token,
        name
    }
}