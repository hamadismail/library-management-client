import { FaBookOpen, FaUpload, FaClipboardList } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const steps = [
  {
    icon: <FaBookOpen className="text-3xl" />,
    title: "Browse Books",
    description: "Explore our extensive collection across diverse categories.",
    color: "bg-gray-200",
    textColor: "text-gray-900"
  },
  {
    icon: <FaUpload className="text-3xl" />,
    title: "Add Your Own",
    description: "Share your books with the community by adding them to our library.",
    color: "bg-gray-200",
    textColor: "text-gray-900"
  },
  {
    icon: <FaClipboardList className="text-3xl" />,
    title: "Manage Borrowings",
    description: "Track due dates and manage your borrowed books effortlessly.",
    color: "bg-gray-200",
    textColor: "text-gray-900"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-barlow-semibold text-gray-900 mb-4">
            Simple Steps to Get Started
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how easy it is to use our library system in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-1 bg-gray-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-9">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Step Number */}
                <div className={`w-12 h-12 ${step.color} ${step.textColor} rounded-full flex items-center justify-center font-barlow-bold text-lg mb-6 mx-auto`}>
                  {idx + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.color} ${step.textColor} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-barlow-medium text-center mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {step.description}
                </p>

                {/* Learn More (optional) */}
                {/* <button className="flex items-center justify-center text-sm font-barlow-medium mx-auto text-gray-900 hover:text-gray-950 transition-colors">
                  Learn more <FiArrowRight className="ml-1" />
                </button> */}
              </div>
            ))}
          </div>
        </div>

        {/* CTA (optional) */}
        <div className="text-center mt-12">
          <button className="cursor-pointer inline-flex items-center px-4 py-2 rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-950 transition-colors duration-200">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
