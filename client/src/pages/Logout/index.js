import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = ({ setToken }) => {
    useEffect(() => {
        setToken(null);
    }, []);
    return (
        < Navigate to="/login" />
    );
};

export default LogoutPage;