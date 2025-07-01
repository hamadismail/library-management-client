import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "./Slide.css";

const Slide = ({ slide }) => {
  return (
    <div className={`${slide.bgClass}`}>

    <div className={`max-w-7xl h-[90vh] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-20 px-4`}>
      {/* Text Content */}
      <div className="max-w-2xl text-center lg:text-left space-y-6 ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-barlow-semibold text-gray-900 leading-tight"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-700"
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to={slide.button.link}
            className="inline-flex items-center px-4 py-2 rounded-full shadow-lg text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-900 hover:to-gray-950 transition-all duration-300 hover:shadow-xl group"
          >
            {slide.button.text}
            <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Image */}
      <motion.div
        className="relative lg:block max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          // y: [0, -15, 0] // subtle floating effect
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          },
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3 }
        }}
      >
        {/* <div className="absolute -inset-6  bg-white/30 rounded-2xl rotate-3"></div> */}
        <img
          src={slide.image}
          alt={slide.title}
          height="30px"
          className="slide-img relative rounded-xl shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </div>
    </div>
  );
};

export default Slide;
