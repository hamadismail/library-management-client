import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="w-11/12 mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site Info */}
          <div>
            <h2 className="text-2xl font-barlow-bold mb-3">Redora</h2>
            <p className="text-sm">
              A smart and responsive Library Management System for schools.
              Discover, borrow, and manage books seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-barlow-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-books" className="hover:underline">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/add-book" className="hover:underline">
                  Add Book
                </Link>
              </li>
              <li>
                <Link to="/borrowed-books" className="hover:underline">
                  Borrowed Books
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-barlow-semibold mb-3">
              Contact & Social
            </h3>
            <p className="text-sm">Email: support@redora.com</p>
            <p className="text-sm mb-4">Phone: +880-1234-567890</p>
            <div className="flex space-x-4 text-2xl">
              <Link
                to="https://www.facebook.com/hamad2k25/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebook />
              </Link>
              <Link
                to="https://github.com/hamadismail"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-400"
              >
                <FaGithub />
              </Link>
              <Link
                to="https://linkedin.com/in/hamadismail"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-300"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-10 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Redora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
