import React from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = ({ value }) => {
  return (
    <Rating
      className="pb-1"
      readonly
      initialValue={value}
      allowFraction
      size={20}
      SVGstyle={{ display: "inline-block" }}
      transition
      fillColor="#fbbf24"
      emptyColor="#e5e7eb"
    />
  );
};

export default StarRating;
