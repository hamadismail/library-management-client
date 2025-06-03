import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    Component: MainLayout,
    children: [{ index: true, Component: Home }],
  },
]);
