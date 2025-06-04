import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import AllBooks from "../pages/AllBooks/AllBooks";
import AddBook from "../pages/AddBook/AddBook";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import SignIn from "../pages/Auth/SignIn/SignIn";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "all-books", Component: AllBooks },
      { path: "add-book", Component: AddBook },
      { path: "borrowed-books", Component: BorrowedBooks },
      { path: "signin", Component: SignIn },
      { path: "register", Component: Register },
    ],
  },
]);
