import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import BorrowedBookCard from "./BorrowedBookCard";
import { ScaleLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";

const BorrowedBooks = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useTitle("Borrowed Books || Redora");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/borrowed-books?email=${user.email}`)
        .then((res) => setBorrowedBooks(res.data))
        .catch((err) => alert(err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📚 Your Borrowed Books
        </h2>

        {loading && (
          <div className="flex justify-center">
            <ScaleLoader />
          </div>
        )}

        {borrowedBooks.length === 0 && !loading ? (
          <p className="text-center text-gray-600">No borrowed books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {borrowedBooks.map((book) => (
              <BorrowedBookCard
                key={book._id}
                book={book}
                borrowedBooks={borrowedBooks}
                setBorrowedBooks={setBorrowedBooks}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BorrowedBooks;
