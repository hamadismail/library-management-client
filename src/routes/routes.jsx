import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import AllBooks from "../pages/AllBooks/AllBooks";
import AddBook from "../pages/AddBook/AddBook";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import SignIn from "../pages/Auth/SignIn/SignIn";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails/BookDetails";
import UpdatePage from "../pages/UpdateBook/UpdateBook";
import BooksByCategory from "../pages/BooksByCategory/BooksByCategory";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: `borrowed-books`,
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdatePage />
          </PrivateRoute>
        ),
      },
      {
        path: "books/category/:id",
        Component: BooksByCategory,
      },
      { path: "signin", Component: SignIn },
      { path: "register", Component: Register },
    ],
  },
]);
