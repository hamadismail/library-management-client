import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import "./slide.css";

const Slide = ({ slide }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-10 px-6">
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-4xl font-barlow-bold text-gray-800 mb-4">
          {slide.title}
        </h2>
        <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
        <Link
          to={slide.button.link}
          className="btn bg-gray-900 font-normal font-barlow-semibold text-white rounded-md hover:bg-gray-950 transition"
        >
          {slide.button.text}
        </Link>
      </div>
      <motion.div
        animate={{
          // y: [0, -10, 0], // bounce effect
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          // delay: idx * 0.5, // stagger
        }}
      >
        <div>
          <img
            src={slide.image}
            alt={slide.title}
            width="450px"
            className="rounded-md slide-img"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Slide;
