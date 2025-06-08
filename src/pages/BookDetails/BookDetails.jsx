import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
// import Rating from "react-rating";
// import { FaStar, FaRegStar } from "react-icons/fa";
import Spinner from "../../components/ui/Spinner";

const BookDetails = () => {
  const { id } = useParams();
  // const book =

  if (!book) {
    return (
      <div className="text-center text-red-500 mt-20">Book not found.</div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full max-w-xs rounded-md shadow-md"
          />
        </div>

        {/* Book Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
          <p className="text-gray-600">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {book.category}
          </p>
          <p className="text-gray-600">
            <strong>Quantity:</strong>{" "}
            {book.quantity > 0 ? book.quantity : "Out of stock"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {/* <Rating
              readonly
              initialRating={book.rating}
              emptySymbol={<FaRegStar className="text-yellow-400" />}
              fullSymbol={<FaStar className="text-yellow-400" />}
              fractions={2}
            /> */}
            {/* <span className="text-sm text-gray-500">({book.rating})</span> */}
          </div>

          {/* Description */}
          {book.description && (
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
