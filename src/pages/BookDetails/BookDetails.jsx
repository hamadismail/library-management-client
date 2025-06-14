import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import { FaArrowLeft, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import { FiUser, FiMail, FiClock } from "react-icons/fi";
import StarRating from "../../components/ui/StarRating";
import useAuth from "../../hooks/useAuth";
import useBookDetails from "../../api/useBookDetails";
import useBorrowedBooks from "../../api/useBorrowedBooks";
import useTitle from "../../hooks/useTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Loader } from "../../components/ui/Loader";
import Spinner from "../../components/ui/Spinner";

const BookDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [loader, setLoader] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { book, loading } = useBookDetails(id);
  const { borrowedBook } = useBorrowedBooks(user?.email);

  useTitle(`${book?.name} | Book Details`);

  const handleBorrow = async () => {
    if (!returnDate || !user) return;
    if (book.quantity <= 0) return;

    setLoader(true);

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

    try {
      await axiosSecure.post("/borrow", {
        bookId: book._id,
        userEmail: user.email,
        userName: user.displayName,
        returnDate,
      });

      Swal.fire({
        icon: "success",
        title: "Book borrowed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      navigate(`/borrowed-books`);
    } catch (err) {
      Swal.fire("Error", "Failed to borrow book.", "error");
    } finally {
      setLoader(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="bg-red-100 p-6 rounded-full mb-4">
          <FaBookOpen className="text-red-500 text-4xl" />
        </div>
        <h3 className="text-2xl font-barlow-semibold text-gray-800 mb-2">Book not found</h3>
        <p className="text-gray-600 mb-6">The requested book doesn't exist or may have been removed</p>
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaArrowLeft /> Back to Books
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Books
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 p-6 flex justify-center">
              <div className="relative w-full max-w-xs h-96">
                <img
                  src={book.image}
                  alt={book.name}
                  className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-3xl font-barlow-semibold text-gray-900 mb-2">{book.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{book.author}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-barlow-medium">
                  <StarRating value={book.rating} />
                  <span>{Number(book.rating).toFixed(1)}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-barlow-medium ${
                  book.quantity > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {book.quantity > 0 ? `${book.quantity} available` : "Out of stock"}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-barlow-medium">
                  {book.category}
                </span>
              </div>

              {book.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-barlow-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={book.quantity == 0}
                  className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-barlow-medium transition-colors ${
                    book.quantity == 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer"
                  }`}
                >
                  <FaBookOpen className="text-lg" />
                  Borrow This Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-2xl font-barlow-semibold text-gray-900 mb-4">
              Borrow "{book.name}"
            </Dialog.Title>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <FiUser className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-barlow-medium">{user?.displayName || "Not available"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <FiMail className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-barlow-medium">{user?.email || "Not available"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <FaCalendarAlt className="text-lg" />
                </div>
                <div className="w-full">
                  <label className="text-sm text-gray-500 block mb-1">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer px-5 py-2 border border-gray-300 rounded-lg font-barlow-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBorrow}
                  disabled={loader}
                  className="cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-lg font-barlow-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {loader ? <Loader size="sm" /> : (
                    <>
                      <FiClock /> Confirm Borrow
                    </>
                  )}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
};

export default BookDetails;
