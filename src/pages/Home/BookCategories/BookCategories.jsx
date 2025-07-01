import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import cat1 from "../../../assets/img/bookCategory/bookCat-1.jpg";
import cat2 from "../../../assets/img/bookCategory/bookCat-2.jpg";
import cat3 from "../../../assets/img/bookCategory/bookCat-3.jpg";
import cat4 from "../../../assets/img/bookCategory/bookCat-4.jpg";

const categories = [
  { name: "Novel", image: cat1, color: "bg-indigo-100", textColor: "text-indigo-800" },
  { name: "Thriller", image: cat2, color: "bg-red-100", textColor: "text-red-800" },
  { name: "History", image: cat3, color: "bg-amber-100", textColor: "text-amber-800" },
  { name: "Sci-Fi", image: cat4, color: "bg-blue-100", textColor: "text-blue-800" },
];

const BookCategories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/books/category/${categoryName}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-barlow-semibold text-gray-900 mb-4">Explore Our Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover books from your favorite genres and find your next great read
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-80"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />
              </div>

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className={`${cat.color} ${cat.textColor} inline-flex items-center px-3 py-1 rounded-full text-xs font-barlow-medium mb-2`}>
                  {cat.name}
                </div>
                <h3 className="text-2xl font-barlow-semibold mb-2">{cat.name}</h3>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2">Browse collection</span>
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button (optional) */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              navigate('/all-books');
              window.scrollTo(0, 0);
            }}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-950 transition-colors duration-200"
          >
            View All Books
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookCategories;
