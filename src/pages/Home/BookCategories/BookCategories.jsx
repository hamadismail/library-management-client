import React from "react";
import { useNavigate } from "react-router";
import cat1 from "../../../assets/img/bookCategory/bookCat-1.jpg";
import cat2 from "../../../assets/img/bookCategory/bookCat-2.jpg";
import cat3 from "../../../assets/img/bookCategory/bookCat-3.jpg";
import cat4 from "../../../assets/img/bookCategory/bookCat-4.jpg";

const categories = [
  { name: "Novel", image: cat1 },
  { name: "Thriller", image: cat2 },
  { name: "History", image: cat3 },
  { name: "Sci-Fi", image: cat4 },
];

const BookCategories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/books/category/${categoryName}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Book Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              handleClick(cat.name);
              window.scrollTo(0, 0);
            }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-48 w-full object-cover rounded"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
