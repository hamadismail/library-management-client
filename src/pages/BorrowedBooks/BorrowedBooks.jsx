import React from "react";
import { FaBook, FaHistory } from "react-icons/fa";
import { FiClock, FiCalendar } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import BorrowedBookCard from "./BorrowedBookCard";
import useTitle from "../../hooks/useTitle";
import useBorrowedBooks from "../../api/useBorrowedBooks";
import { Loader } from "../../components/ui/Loader";
import Spinner from "../../components/ui/Spinner";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const { borrowedBook, setBorrowedBook, loading } = useBorrowedBooks(user?.email);
  useTitle("Borrowed Books || Redora");

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
            <FaBook className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-3xl font-barlow-semibold text-gray-900 sm:text-4xl">
            Your Borrowed Books
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Manage and track your current borrowings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <FaBook className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Borrowed</p>
                <p className="text-2xl font-barlow-semibold text-gray-800">
                  {borrowedBook?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <FiClock className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-barlow-semibold text-gray-800">
                  {borrowedBook?.filter(b => new Date(b.returnDate) > new Date()).length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                <FiCalendar className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-barlow-semibold text-gray-800">
                  {borrowedBook?.filter(b => new Date(b.returnDate) < new Date()).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : borrowedBook?.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FaHistory className="w-full h-full" />
            </div>
            <h3 className="mt-4 text-lg font-barlow-medium text-gray-900">
              No borrowed books
            </h3>
            <p className="mt-2 text-gray-500">
              You haven't borrowed any books yet
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {borrowedBook?.map((book) => (
              <BorrowedBookCard
                key={book._id}
                book={book}
                borrowedBooks={borrowedBook}
                setBorrowedBooks={setBorrowedBook}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BorrowedBooks;
