import React from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import StarRating from "../../components/ui/StarRating";
import { useNavigate } from "react-router";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={book.image}
        alt={book.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{book.name}</h3>
        <p className="text-gray-600">Author: {book.author}</p>
        <p className="text-gray-600">Category: {book.category}</p>
        <p className="text-gray-600 flex items-center gap-2">
          Rating:
          <StarRating value={book.rating} />
          {Number(book.rating).toFixed(1)}
        </p>
        <p className="text-gray-600">Quantity: {book.quantity}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              navigate(`/book/${book._id}`);
              window.scrollTo(0, 0);
            }}
            className="mt-2 cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950"
          >
            <FaEye />
            Details
          </button>

          <button
            onClick={() => {
              navigate(`/update/${book._id}`);
              window.scrollTo(0, 0);
            }}
            className="mt-2 cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950"
          >
            <FiEdit /> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
