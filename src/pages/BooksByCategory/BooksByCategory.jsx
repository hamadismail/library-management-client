import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaBookOpen, FaSearch, FaTimes } from "react-icons/fa";
import BookCard from "../AllBooks/BookCard";
import useTitle from "../../hooks/useTitle";
import { Loader } from "../../components/ui/Loader";
import Spinner from "../../components/ui/Spinner";
import { ScaleLoader } from "react-spinners";

const BooksByCategory = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    title: true,
    author: true,
    category: false,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://redora.vercel.app/books/category/${id}`
        );
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch category books:", err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [id]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBooks(books);
      return;
    }

    const results = books.filter((book) => {
      const matches = [];
      if (searchFilters.title) {
        matches.push(
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (searchFilters.author) {
        matches.push(
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (searchFilters.category) {
        matches.push(
          book.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return matches.some((match) => match);
    });

    setFilteredBooks(results);
  }, [searchTerm, books, searchFilters]);

  useTitle(`${books[0]?.category || id} || Redora`);

  const toggleSearchFilter = (filter) => {
    setSearchFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredBooks(books);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
          <FaBookOpen className="w-8 h-8 text-gray-900" />
        </div>
        <h1 className="text-3xl font-barlow-semibold text-gray-900 sm:text-4xl">
          {books[0]?.category || id} Books
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          {books.length} {books.length === 1 ? "book" : "books"} available
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${books[0]?.category || id} books...`}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FaTimes className="text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </div>

          {/* Search Filters */}
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            <span className="text-sm text-gray-500">Search in:</span>
            <button
              onClick={() => toggleSearchFilter("title")}
              className={`px-3 py-1 rounded-full text-xs font-barlow-medium ${
                searchFilters.title
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Titles
            </button>
            <button
              onClick={() => toggleSearchFilter("author")}
              className={`px-3 py-1 rounded-full text-xs font-barlow-medium ${
                searchFilters.author
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Authors
            </button>
            <button
              onClick={() => toggleSearchFilter("category")}
              className={`px-3 py-1 rounded-full text-xs font-barlow-medium ${
                searchFilters.category
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Categories
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="flex justify-center"> <ScaleLoader /></div>}

      {/* Results Count */}
      {searchTerm && (
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Found {filteredBooks.length}{" "}
            {filteredBooks.length === 1 ? "result" : "results"} for "
            {searchTerm}"
          </p>
        </div>
      )}

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <FaBookOpen className="w-full h-full" />
          </div>
          <h3 className="mt-4 text-lg font-barlow-medium text-gray-900">
            {searchTerm
              ? "No matching books found"
              : "No books in this category"}
          </h3>
          <p className="mt-2 text-gray-500">
            {searchTerm
              ? "Try adjusting your search or filters"
              : `We couldn't find any books in the ${id} category`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksByCategory;
