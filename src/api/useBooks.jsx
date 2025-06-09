import React, { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import axios from "axios";

const useBooks = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((error) => alert(error.code))
      .finally(() => setLoading(false));
  }, []);

  return { books, loading };
};

export default useBooks;
