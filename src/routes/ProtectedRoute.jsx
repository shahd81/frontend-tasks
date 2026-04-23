import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import { getToken } from "../services/token";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function ProtectedRoute({ allowedRoles, children }) {
  const {accessToken}=useContext(AuthContext);
  const { role } = useAuth();

  // const token=getToken();
  if (!accessToken) {
    console.log("ProtectedRoute token:", accessToken);
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/NotAuthorized" replace />;
  }
  return children;
}
