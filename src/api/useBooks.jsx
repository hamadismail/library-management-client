import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useBooks = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((error) => alert(error.code))
      .finally(() => setLoading(false));
  }, []);

  return { books, loading };
};

export default useBooks;
