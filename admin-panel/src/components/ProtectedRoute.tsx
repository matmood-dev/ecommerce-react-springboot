// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[]; // Optional: if not passed, allow any logged-in user
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // Not logged in
  if (!token || !user) return <Navigate to="/login" replace />;

  // Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
}
