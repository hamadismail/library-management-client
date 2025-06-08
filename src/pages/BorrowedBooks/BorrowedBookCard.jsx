import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const BorrowedBookCard = ({ book, borrowedBooks, setBorrowedBooks }) => {
  const handleReturn = (book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, returned it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/borrowed/${book._id}`)
          .then((data) => {
            if (data.data) {
              Swal.fire({
                title: "Returned!",
                text: "You Returned this book",
                icon: "success",
              });
            }
            // Update the state after deletion
            setBorrowedBooks(borrowedBooks.filter((b) => b._id !== book._id));
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to return the book", error);
          });
      }
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={book.image}
        alt={book.name}
        className="h-48 object-cover w-full"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{book.name}</h3>
          <p className="text-sm text-gray-600 mb-1">
            Category: <span className="font-medium">{book.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Borrowed Date:{" "}
            <span className="font-medium">
              {new Date(book.borrowDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            To be Returned:{" "}
            <span className="font-medium">
              {new Date(book.returnDate).toLocaleDateString()}
            </span>
          </p>
        </div>
        <button
          onClick={() => handleReturn(book)}
          className="mt-4 cursor-pointer w-full bg-gray-900 hover:bg-gray-950 text-white py-2 px-4 rounded-md font-semibold transition"
        >
          Return Book
        </button>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
