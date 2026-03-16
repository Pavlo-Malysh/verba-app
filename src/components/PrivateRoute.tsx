import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";

export default function PrivateRoute() {
    const { user, loading } = useAuthState();
    const context = useOutletContext();

    if (loading) return null;

    return user ? <Outlet context={context} /> : <Navigate to="/" replace />;
}
