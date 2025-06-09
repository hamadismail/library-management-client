import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Spinner from "../../components/ui/Spinner";
import StarRating from "../../components/ui/StarRating";
import useAuth from "../../hooks/useAuth";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import useBookDetails from "../../api/useBookDetails";
import useBorrowedBooks from "../../api/useBorrowedBooks";
import useTitle from "../../hooks/useTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { book, loading } = useBookDetails(id);
  const { borrowedBook } = useBorrowedBooks(user.email);

  useTitle(`${book?.name} | Book Details`);

  const handleBorrow = async () => {
    if (!returnDate || !user) return;
    if (book.quantity <= 0) return;

    const isBorrowed = borrowedBook.find((b) => b.bookId === book._id);
    if (isBorrowed) {
      Swal.fire({
        icon: "error",
        title: "This book is already borrowed",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      return;
    }

    await axiosSecure
      .post("/borrow", {
        bookId: book._id,
        userEmail: user.email,
        userName: user.displayName,
        returnDate,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Book borrowed successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
        navigate(`/borrowed-books`);
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to borrow book.", err.code);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-8">
        <Spinner />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-red-500 mt-20 mb-10">
        Book not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={book.image}
            alt={book.name}
            className="h-96 w-full max-w-xs rounded-md shadow-md"
          />
        </div>

        {/* Book Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{book.name}</h2>
          <p className="text-gray-600">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {book.category}
          </p>
          <p className="text-gray-600">
            <strong>Quantity:</strong>
            <span className={`${book.quantity == 0 && "text-red-600"}`}>
              {" "}
              {book.quantity > 0 ? book.quantity : "Out of stock"}
            </span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <p className="text-gray-600 flex items-center gap-2">
              Rating:
              <StarRating value={book.rating} />
              {Number(book.rating).toFixed(1)}
            </p>
          </div>

          {/* Description */}
          {book.description && (
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          )}

          {/* Borrow Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={book.quantity == 0}
            className={`px-5 py-2 text-white rounded ${
              book.quantity == 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-blue-950 cursor-pointer"
            }`}
          >
            Borrow
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-black/50 fixed inset-0" />
        <div className="bg-white rounded-lg p-6 z-10 max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-4">
            Borrow Book
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={user?.displayName || ""}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="returnDate"
              >
                Return Date
              </label>
              <input
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBorrow}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-950 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default BookDetails;
