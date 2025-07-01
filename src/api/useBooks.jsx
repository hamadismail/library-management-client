import React, { useEffect, useState } from "react";
import axios from "axios";

const useBooks = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);


  useEffect(() => {
    axios
      .get("https://redora.vercel.app/books")
      .then((res) => setBooks(res.data))
      .catch((error) => alert(error.code))
      .finally(() => setLoading(false));
  }, []);

  return { books, loading };
};

export default useBooks;
