import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Movie from "./components/Movie/Movie";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/PrivateRoute/PrivateRoute";
import { useAuth } from "./hooks/useAuth";

const Router = () => {
  const { state } = useAuth();

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: !!state.user.isAuthenticated,
    authenticationPath: "/",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/last-movie"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Movie />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
