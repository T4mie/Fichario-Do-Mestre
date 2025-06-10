import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../backend/auth";
import { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}