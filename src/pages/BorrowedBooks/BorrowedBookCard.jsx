import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCalendarAlt, FaUndo } from "react-icons/fa";
import { FiClock, FiBook } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

const BorrowedBookCard = ({ book, borrowedBooks, setBorrowedBooks }) => {
  const axiosSecure = useAxiosSecure();
  const isOverdue = new Date(book.returnDate) < new Date();

  const handleReturn = () => {
    Swal.fire({
      title: "Return this book?",
      text: "Please confirm you're returning this book",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, mark as returned",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/borrowed/${book._id}`)
          .then(() => {
            Swal.fire({
              title: "Book Returned!",
              text: "Thank you for returning the book",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            setBorrowedBooks(borrowedBooks.filter((b) => b._id !== book._id));
          })
          .catch(() => {
            Swal.fire("Error", "Failed to return the book", "error");
          });
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-200 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Book Cover and Basic Info */}
      <div className="flex p-3 border-b border-gray-100">
        <div className="w-16 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {book.name}
          </h3>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <MdCategory className="mr-1" />
            <span className="truncate">{book.category}</span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="p-3 space-y-2 text-sm">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-400 mr-2 flex-shrink-0" />
          <div>
            <p className="text-gray-500 text-xs">Borrowed</p>
            <p className="text-gray-700">
              {new Date(book.borrowDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FiClock className={`mr-2 flex-shrink-0 ${
            isOverdue ? "text-red-500" : "text-gray-400"
          }`} />
          <div>
            <p className="text-gray-500 text-xs">Due date</p>
            <p className={`${isOverdue ? "text-red-600" : "text-gray-700"}`}>
              {new Date(book.returnDate).toLocaleDateString()}
              {isOverdue && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                  Overdue
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Return Button */}
      <div className="mt-auto p-3 border-t border-gray-100">
        <button
          onClick={handleReturn}
          className="cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md font-medium transition-colors duration-200"
        >
          <FaUndo size={14} />
          Return Book
        </button>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
