import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useBookDetails = (id) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!id) return;

    axiosSecure
      .get(`/book/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        Swal.fire("Error", "No Book Found", err.code);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { book, loading };
};

export default useBookDetails;
