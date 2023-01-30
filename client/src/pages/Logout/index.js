import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = ({ setToken }) => {
  useEffect(() => {
    setToken(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Navigate to="/login" />;
};

export default LogoutPage;
