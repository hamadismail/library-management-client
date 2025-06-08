import React from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ value }) => {
  return (
    <Rating
      readonly
      initialRating={value}
      emptySymbol={<FaRegStar className="text-yellow-400" />}
      fullSymbol={<FaStar className="text-yellow-400" />}
      fractions={2} // Allows half-star rating
    />
  );
};

export default StarRating;
