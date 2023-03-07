import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Movie from "./components/Movie/Movie";
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/last-movie",
    element: <ProtectedRoute authenticationPath="/" outlet={<Movie />} />,
  },
]);

export default router;
