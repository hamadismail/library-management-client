import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import BookTable from "./BookTable";
import { ScaleLoader } from "react-spinners";
import useBooks from "../../api/useBooks";
import useTitle from "../../hooks/useTitle";

const AllBooks = () => {
  const [viewMode, setViewMode] = useState("card");
  const [showAvailable, setShowAvailable] = useState(false);
  const { books, loading } = useBooks();

  useTitle("All Books || Redora");

  const filteredBooks = showAvailable
    ? books.filter((book) => Number(book.quantity) > 0)
    : books;

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          📚 All Books
        </h2>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setShowAvailable(!showAvailable)}
            className="bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            {showAvailable ? "Show All Books" : "Show Available Books"}
          </button>

          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        {/* Views */}
        {loading && (
          <div className="flex justify-center">
            <ScaleLoader />
          </div>
        )}
        {viewMode === "card" ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-900 text-left text-white">
                  <th className="px-4 py-2">Cover</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Author</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, idx) => (
                  <BookTable key={book._id} book={book} idx={idx} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooks;
