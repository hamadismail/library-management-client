import React, { useState } from "react";
import BookCard from "./BookCard";
import BookTable from "./BookTable";
import { ScaleLoader } from "react-spinners";
import useBooks from "../../api/useBooks";
import useTitle from "../../hooks/useTitle";
import { FiFilter, FiBook, FiChevronDown, FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { FaTh, FaList } from "react-icons/fa";

const AllBooks = () => {
  const [viewMode, setViewMode] = useState("card");
  const [showAvailable, setShowAvailable] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'
  const { books, loading } = useBooks();

  useTitle("All Books || Redora");

  const toggleViewDropdown = () => setShowViewDropdown(!showViewDropdown);

  const handleViewChange = (mode) => {
    setViewMode(mode);
    setShowViewDropdown(false);
  };

  const toggleSortOrder = () => {
    if (sortOrder === null) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
    }
  };

  const filteredBooks = books
    .filter((book) =>
      showAvailable ? Number(book.quantity) > 0 : true
    )
    .filter((book) =>
      [book.name, book.author, book.category]
        .some((field) =>
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  // Sort books based on quantity if sortOrder is not null
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === null) return 0;
    const quantityA = Number(a.quantity);
    const quantityB = Number(b.quantity);
    return sortOrder === 'asc' ? quantityA - quantityB : quantityB - quantityA;
  });

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
            <FiBook className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-3xl font-barlow-semibold text-gray-900 sm:text-4xl">
            Our Book Collection
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Browse through our extensive library of books
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Filter Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAvailable(!showAvailable)}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                showAvailable
                  ? "bg-gray-900 text-white hover:bg-gray-950"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              <FiFilter className="w-4 h-4" />
              {showAvailable ? "Show All Books" : "Show Available Only"}
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, author or category..."
                className="w-full px-4 py-2 pl-10 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
            </div>
          </div>

          {/* View Mode Dropdown */}
          <div className="flex items-center gap-4">
            {/* Sort Button */}
            <button
              onClick={toggleSortOrder}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                sortOrder !== null
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {sortOrder === 'asc' ? (
                <FiArrowUp className="w-4 h-4" />
              ) : sortOrder === 'desc' ? (
                <FiArrowDown className="w-4 h-4" />
              ) : (
                <FiFilter className="w-4 h-4" />
              )}
              <span>
                {sortOrder === 'asc' ? 'Quantity (Low to High)' :
                 sortOrder === 'desc' ? 'Quantity (High to Low)' : 'Sort by Quantity'}
              </span>
            </button>

            <div className="relative max-md:hidden">
              <button
                onClick={toggleViewDropdown}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md transition-colors"
              >
                {viewMode === "card" ? (
                  <>
                    <FaTh className="w-4 h-4" />
                    <span>Card View</span>
                  </>
                ) : (
                  <>
                    <FaList className="w-4 h-4" />
                    <span>Table View</span>
                  </>
                )}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showViewDropdown ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {showViewDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => handleViewChange("card")}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-left ${
                          viewMode === "card"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FaTh className="w-4 h-4" />
                        <span>Card View</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleViewChange("table")}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-left ${
                          viewMode === "table"
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FaList className="w-4 h-4" />
                        <span>Table View</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex text-gray-900 justify-center items-center h-64">
            <ScaleLoader color="#101828" />
          </div>
        ) : (
          <>
            {sortedBooks.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <FiBook className="w-full h-full" />
                </div>
                <h3 className="mt-4 text-lg font-barlow-medium text-gray-900">
                  No books found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : viewMode === "card" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">Cover</th>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">
                          <button
                            onClick={toggleSortOrder}
                            className="flex items-center gap-1 hover:text-gray-700"
                          >
                            Quantity
                            {sortOrder === 'asc' ? (
                              <FiArrowUp className="w-3 h-3" />
                            ) : sortOrder === 'desc' ? (
                              <FiArrowDown className="w-3 h-3" />
                            ) : null}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-barlow-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedBooks.map((book, idx) => (
                        <BookTable key={book._id} book={book} idx={idx} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllBooks;
