import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
    const token = localStorage.getItem('auth-token');

    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRouter;