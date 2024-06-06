import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/actions";

const PrivateRouteFavorites = () => {
    const usuario = useSelector(isAuthenticated);
    return usuario && usuario.usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteFavorites;