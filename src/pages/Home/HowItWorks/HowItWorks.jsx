import { FaBookOpen, FaUpload, FaClipboardList } from "react-icons/fa";

const steps = [
  {
    icon: <FaBookOpen className="text-4xl text-gray-900" />,
    title: "Browse Books",
    description:
      "Explore a wide variety of books across different categories available in the library.",
  },
  {
    icon: <FaUpload className="text-4xl text-gray-900" />,
    title: "Add Your Own",
    description:
      "Contribute to the collection by adding books you want to share with others.",
  },
  {
    icon: <FaClipboardList className="text-4xl text-gray-900" />,
    title: "Manage Borrowed Books",
    description:
      "Easily track and manage the books you've borrowed from your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-barlow-bold text-center mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl px-6 py-12 shadow hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-barlow-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
