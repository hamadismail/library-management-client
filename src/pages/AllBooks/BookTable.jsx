import React from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";
import StarRating from "../../components/ui/StarRating";

const BookTable = ({ book, idx }) => {
  const index = idx + 1;
  const navigate = useNavigate();
  return (
    <tr className={`border-t ${index % 2 === 0 && "bg-gray-200"}`}>
      <td className="px-4 py-2">
        <img
          src={book.image}
          alt={book.name}
          className="h-16 w-12 object-cover rounded"
        />
      </td>
      <td className="px-4 py-2">{book.name}</td>
      <td className="px-4 py-2">{book.author}</td>
      <td className="px-4 py-2">{book.category}</td>
      <td className="px-4 py-2">
        <p className="text-gray-600 flex items-center gap-2">
          Rating:
          <StarRating value={book.rating} />
          {Number(book.rating).toFixed(1)}
        </p>
      </td>
      <td className="px-4 py-2">{book.quantity}</td>
      <td className="px-4 py-2">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/book/${book._id}`)}
            className=" cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950"
          >
            <FaEye />
          </button>

          <button
            onClick={() => navigate(`/update/${book._id}`)}
            className="cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950"
          >
            <FiEdit />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookTable;
