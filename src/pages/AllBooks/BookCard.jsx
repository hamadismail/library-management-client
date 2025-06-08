import React from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import StarRating from "../../components/ui/StarRating";

const BookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={book.image}
        alt={book.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{book.name}</h3>
        <p className="text-gray-600">Author: {book.author}</p>
        <p className="text-gray-600">Category: {book.category}</p>
        <p className="text-gray-600 flex items-center gap-2">
          <span>Rating:</span>
          <span className="pt-1">
            <StarRating value={book.rating} />
          </span>
          <span>({book.rating})</span>
        </p>
        <p className="text-gray-600">Quantity: {book.quantity}</p>

        <div className="flex justify-between items-center">
          <button className="mt-2 cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950">
            <FaEye />
            Details
          </button>

          <button className="mt-2 cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950">
            <FiEdit /> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
