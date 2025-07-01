import React from "react";
import { FaEye, FaBook } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import StarRating from "../../components/ui/StarRating";
import { useNavigate } from "react-router";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 flex flex-col h-full">
      {/* Book Cover with Status Indicator */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden group">
        {book.image ? (
          <img
            src={book.image}
            alt={book.name}
            className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <FaBook className="text-4xl" />
          </div>
        )}
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-semibold ${book.quantity > 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {book.quantity > 0 ? `${book.quantity} Available` : 'Out of Stock'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className="text-lg font-barlow-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer truncate"
          onClick={() => {
            navigate(`/book/${book._id}`);
            window.scrollTo(0, 0);
          }}
        >
          {book.name}
        </h3>

        {/* Metadata */}
        <div className="mb-4 space-y-2">
          <div className="flex items-start">
            <span className="text-xs text-gray-500 w-14">Author</span>
            <span className="text-sm text-gray-700 flex-1 line-clamp-1">{book.author || 'Unknown'}</span>
          </div>
          <div className="flex items-start">
            <span className="text-xs text-gray-500 w-14">Genre</span>
            <span className="text-sm text-gray-700 flex-1 line-clamp-1">{book.category || 'Uncategorized'}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-auto mb-4">
          <StarRating value={book.rating} size="sm" />
          <span className="ml-2 text-sm font-barlow-medium text-gray-700">
            {Number(book.rating).toFixed(1)}
          </span>
          {/* <span className="mx-2 text-gray-300">|</span>
          <span className="text-xs text-gray-500">ISBN: {book.isbn?.slice(0, 8) || 'N/A'}</span> */}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigate(`/book/${book._id}`);
              window.scrollTo(0, 0);
            }}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-950 text-white px-3 py-2 rounded text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            <FaEye className="text-xs" />
            View Details
          </button>
          <button
            onClick={() => {
              navigate(`/update/${book._id}`);
              window.scrollTo(0, 0);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-3 py-2 rounded text-sm font-barlow-medium transition-colors duration-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
          >
            <FiEdit className="text-xs" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
