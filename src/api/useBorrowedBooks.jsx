import { useEffect, useState } from "react";
import axios from "axios";

const useBorrowedBooks = (email) => {
  const [borrowedBook, setBorrowedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    axios
      .get(`http://localhost:3000/borrowed-books?email=${email}`)
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

  return { borrowedBook };
};

export default useBorrowedBooks;
