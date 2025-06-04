import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import AllBooks from "../pages/AllBooks/AllBooks";
import AddBook from "../pages/AddBook/AddBook";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";

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
    ],
  },
]);
