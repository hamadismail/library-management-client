import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Spinner from "../../components/ui/Spinner";
import BookCard from "../AllBooks/BookCard";
import useTitle from "../../hooks/useTitle";

const BooksByCategory = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://redora.vercel.app/books/category/${id}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch category books:", err);
        setLoading(false);
      });
  }, [id]);

  useTitle(`${books[0]?.category} || Redora`);

  if (loading) return <Spinner />;

  if (books.length === 0)
    return (
      <p className="text-center py-10">No books found in "{id}" category.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Books in "{id}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksByCategory;
