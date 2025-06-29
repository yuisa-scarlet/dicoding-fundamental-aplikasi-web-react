import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div className="loading-spinner">
          <div
            className="spinner"
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #2196f3",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p
            style={{ marginTop: "1rem", color: "var(--color-text-secondary)" }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
