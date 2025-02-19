import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// helps so no back and forthin
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
