const testimonials = [
  {
    name: "Cavan S.",
    feedback:
      "This library system has completely changed the way I borrow books. It's easy, fast, and user-friendly!",
    image: "https://i.ibb.co/pBVj63cD/author3.jpg",
  },
  {
    name: "Tania R.",
    feedback:
      "Adding books to the library was so simple. It's a great initiative to share knowledge with others.",
    image: "https://i.ibb.co/HfJzBYyf/author2.jpg",
  },
  {
    name: "Rehan M.",
    feedback:
      "I love how I can track my borrowed books and get reminders. Highly recommended for book lovers!",
    image: "https://i.ibb.co/Mx218tGm/author1.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-barlow-bold text-center mb-10">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 px-6 py-8 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
              <h4 className="text-center font-barlow-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
