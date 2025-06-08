import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Spinner from "../../components/ui/Spinner";
import StarRating from "../../components/ui/StarRating";
import useAuth from "../../hooks/useAuth";
import { Dialog } from "@headlessui/react";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [borrowedBook, setBorrowedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/book/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error fetching book.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/borrowed-books?email=${user.email}`)
      .then((res) => {
        setBorrowedBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error fetching borrowed books.");
        setLoading(false);
      });
  }, [user.email]);

  const handleBorrow = async () => {
    if (!returnDate || !user) return;
    if (book.quantity <= 0) return;

    const isBorrowed = borrowedBook.find((b) => b.bookId === book._id);
    if (isBorrowed) {
      alert("This book is already borrowed");
      setIsModalOpen(false);
      return;
    }

    try {
      await axios.post("http://localhost:3000/borrow", {
        bookId: book._id,
        userEmail: user.email,
        userName: user.displayName,
        returnDate,
      });

      // Decrease quantity (but not below 0)
      setBook((prev) => ({
        ...prev,
        quantity: Math.max(parseInt(prev.quantity) - 1, 0),
      }));

      setIsModalOpen(false);
      alert("Book borrowed successfully!");
      navigate(`/borrowed-books?email=${user.email}`);
    } catch (err) {
      alert("Failed to borrow book.");
    }
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
      <div className="text-center text-red-500 mt-20">Book not found.</div>
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
