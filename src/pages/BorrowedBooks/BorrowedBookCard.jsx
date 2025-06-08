import React from "react";

const BorrowedBookCard = ({ book }) => {
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
