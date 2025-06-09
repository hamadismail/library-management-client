import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import BorrowedBookCard from "./BorrowedBookCard";
import { ScaleLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";
import useBorrowedBooks from "../../api/useBorrowedBooks";
import Spinner from "../../components/ui/Spinner";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const { borrowedBook, setBorrowedBook, loading } = useBorrowedBooks(
    user.email
  );

  useTitle("Borrowed Books || Redora");

  if (!borrowedBook) return <Spinner />;

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📚 Your Borrowed Books
        </h2>

        {borrowedBook.length === 0 && !loading ? (
          <p className="text-center text-gray-600">No borrowed books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {borrowedBook?.map((book) => (
              <BorrowedBookCard
                key={book._id}
                book={book}
                borrowedBooks={borrowedBook}
                setBorrowedBooks={setBorrowedBook}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BorrowedBooks;
