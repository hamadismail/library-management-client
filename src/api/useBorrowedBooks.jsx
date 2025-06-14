import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useBorrowedBooks = (email) => {
  const [borrowedBook, setBorrowedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!email) return;
    axiosSecure
      .get(`/borrowed-books?email=${email}`)
      .then((res) => {
        setBorrowedBook(res.data);
      })
      .catch((err) => {
        alert("Error fetching borrowed books.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  return { borrowedBook, setBorrowedBook, loading };
};

export default useBorrowedBooks;
