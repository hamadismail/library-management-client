import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    author: "",
    category: "",
    quantity: "",
    rating: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/book/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => alert(err));
  }, [id]);

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
    axios
      .put(`http://localhost:3000/update/${id}`, book)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Book Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/all-books");
      })
      .catch((err) => alert(err));
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-8">
        <h2 className="text-3xl font-barlow-bold text-gray-800 text-center">
          ✏️ Update Book
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
              />
              <FiUpload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />
            </div>
            {book.image && (
              <img
                src={book.image}
                alt="Preview"
                className="mt-2 h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Book Title */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Book Title
            </label>
            <input
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
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
              className="w-full border border-gray-300 rounded-md p-2"
              required
              min="0"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
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
              className="w-full border border-gray-300 rounded-md p-2"
              min="1"
              max="5"
              step="0.5"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-barlow-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-950 cursor-pointer text-white font-barlow-semibold px-6 py-2 rounded-md"
            >
              ✅ Update Book
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBook;
