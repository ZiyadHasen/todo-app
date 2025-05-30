import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Error from "./pages/Error";
import AuthLayout from "./layouts/AuthLayout";
import { ToastContainer } from "react-toastify";
import { RootLayout } from "./layouts/RootLayout";
import { AuthProvider } from "./context/AuthProvider";
import { TodoProvider } from "./context/TodoContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    // App routes - full-blown layout for logged in users.
    path: "/app",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "edit-profile", element: <EditProfile /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TodoProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </TodoProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
