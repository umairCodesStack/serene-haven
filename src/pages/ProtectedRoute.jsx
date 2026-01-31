import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  //Load authenticated user
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  //if is Loading show spinner
  if (isLoading) return <Spinner />;

  //if there is no authenticated redirect to log in page
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
