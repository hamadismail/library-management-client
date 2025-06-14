import React from "react";
import { FaEye, FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";
import StarRating from "../../components/ui/StarRating";

const BookTable = ({ book, idx }) => {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200 last:border-b-0">
      {/* Cover Image */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-16 w-12 rounded-md overflow-hidden">
            <img
              src={book.image}
              alt={book.name}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </td>

      {/* Title */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">
          {book.name}
        </div>
      </td>

      {/* Author */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 line-clamp-2">
          {book.author}
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {book.category}
        </span>
      </td>

      {/* Rating */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <StarRating value={book.rating} />
          <span className="text-sm font-medium text-gray-900">
            {Number(book.rating).toFixed(1)}
          </span>
        </div>
      </td>

      {/* Quantity */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          book.quantity > 0
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
          {book.quantity} {book.quantity === 1 ? "copy" : "copies"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/book/${book._id}`)}
            className="cursor-pointer inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            title="View details"
          >
            <FaRegEye className="h-4 w-4" />
          </button>

          <button
            onClick={() => navigate(`/update/${book._id}`)}
            className="cursor-pointer inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            title="Edit book"
          >
            <FiEdit className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookTable;
