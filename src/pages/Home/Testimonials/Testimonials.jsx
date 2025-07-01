import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Cavan S.",
    role: "Avid Reader",
    feedback: "This library system has completely changed the way I borrow books. It's easy, fast, and user-friendly!",
    image: "https://i.ibb.co/pBVj63cD/author3.jpg",
    rating: 5
  },
  {
    name: "Tania R.",
    role: "Book Donor",
    feedback: "Adding books to the library was so simple. It's a great initiative to share knowledge with others.",
    image: "https://i.ibb.co/HfJzBYyf/author2.jpg",
    rating: 4
  },
  {
    name: "Rehan M.",
    role: "Student",
    feedback: "I love how I can track my borrowed books and get reminders. Highly recommended for book lovers!",
    image: "https://i.ibb.co/Mx218tGm/author1.jpg",
    rating: 5
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-barlow-semibold text-gray-900 mb-4">Voices of Our Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what our members are saying about their reading experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-3xl text-blue-100 mb-4" />

              {/* Feedback */}
              <p className="text-gray-600 mb-6 flex-1">"{testimonial.feedback}"</p>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-barlow-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More (optional) */}
        <div className="text-center mt-12">
          <button className="cursor-pointer inline-flex items-center px-4 py-2 shadow-sm text-white rounded-md bg-gray-900 hover:bg-gray-950 transition-colors duration-200">
            Read More Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
