import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const valid = isTokenValid();

  if (!valid) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}
