import React from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const BookTable = ({ book }) => {
  return (
    <tr className="border-t">
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
      <td className="px-4 py-2">⭐ {book.rating}</td>
      <td className="px-4 py-2">{book.quantity}</td>
      <td className="px-4 py-2">
        <div className="flex gap-2 items-center">
          <button className=" cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950">
            <FaEye />
          </button>

          <button className="cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-950">
            <FiEdit />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookTable;
