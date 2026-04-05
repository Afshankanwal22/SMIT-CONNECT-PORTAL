import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem(role));

  if (!user) return <Navigate to="/" />;

  return children;
}