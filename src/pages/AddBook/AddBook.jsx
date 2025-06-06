import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    category: "",
    quantity: "",
    rating: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setBook((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBook({
        ...book,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit book to database
    console.log(book);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-8">
        <h2 className="text-3xl font-barlow-bold text-gray-800 text-center">
          📚 Add a New Book
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Book Cover Image
            </label>
            <div className="relative">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 pr-8"
                required
              />
              <FiUpload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />
            </div>
          </div>

          {/* Book Name */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Book Title
            </label>
            <input
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={book.quantity}
              onChange={handleChange}
              placeholder="0"
              min="1"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Author's name"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              value={book.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              placeholder="4.5"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Description (full width) */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Short Description
            </label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Write a brief description about the book..."
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gray-900 cursor-pointer text-white font-barlow-semibold px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              ➕ Add Book
            </button>
          </div>
        </form>

        {/* Static Book Content Section */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-barlow-semibold text-gray-700 mb-2">
            📖 Book Content
          </h3>
          <p className="text-gray-600 text-sm">
            This section will provide additional insights and metadata about the
            book after submission. It helps readers learn more about the
            content, genre, and value the book provides. Make sure the
            description is meaningful and the details are accurate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddBook;
