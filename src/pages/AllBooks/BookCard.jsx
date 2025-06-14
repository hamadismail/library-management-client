import React from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import StarRating from "../../components/ui/StarRating";
import { useNavigate } from "react-router";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative pb-[70%] overflow-hidden">
        <img
          src={book.image}
          alt={book.name}
          className="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{book.name}</h3>

        <div className="flex items-center text-sm text-gray-600 mb-1">
          <span className="font-medium">Author:</span>
          <span className="ml-1 line-clamp-1">{book.author}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="font-medium">Category:</span>
          <span className="ml-1 line-clamp-1">{book.category}</span>
        </div>

        <div className="flex items-center text-sm mb-3">
          <span className="font-medium text-gray-600 mr-1">Rating:</span>
          <StarRating value={book.rating} />
          <span className="ml-1 text-gray-700 font-medium">
            {Number(book.rating).toFixed(1)}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="font-medium">Quantity:</span>
          <span className="ml-1">{book.quantity}</span>
        </div>

        <div className="flex justify-between space-x-3">
          <button
            onClick={() => {
              navigate(`/book/${book._id}`);
              window.scrollTo(0, 0);
            }}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <FaEye className="text-sm" />
            Details
          </button>

          <button
            onClick={() => {
              navigate(`/update/${book._id}`);
              window.scrollTo(0, 0);
            }}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <FiEdit className="text-sm" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
