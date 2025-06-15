import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import slide1 from "../../../assets/img/slide1.jpg";
import slide2 from "../../../assets/img/slide2.jpg";
import slide3 from "../../../assets/img/slide3.jpg";
import Slide from "./Slide";

const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "Discover Your Next Favorite Book",
      subtitle: "Explore our carefully curated collection of thousands of titles across all genres.",
      button: {
        text: "Browse Collection",
        link: "/all-books",
      },
      image: slide1,
      bgClass: "bg-gradient-to-br from-blue-50 to-indigo-50"
    },
    {
      title: "Share the Joy of Reading",
      subtitle: "Contribute to our community by adding books you love to our growing library.",
      button: {
        text: "Add a Book",
        link: "/add-book",
      },
      image: slide2,
      bgClass: "bg-gradient-to-br from-purple-50 to-pink-50"
    },
    {
      title: "Your Personal Reading Hub",
      subtitle: "Easily track and manage all your borrowed books in one place.",
      button: {
        text: "View My Books",
        link: "/borrowed-books",
      },
      image: slide3,
      bgClass: "bg-gradient-to-br from-green-50 to-teal-50"
    },
  ];

  return (
    <section className="relative overflow-hidden">

      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={800}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className=""
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide slide={slide}/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-9 flex items-center gap-6">
        <button
          ref={prevRef}
          className="cursor-pointer w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-blue-600 w-6' : 'bg-blue-600/50'}`}
            />
          ))}
        </div>

        <button
          ref={nextRef}
          className="cursor-pointer w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-all duration-300"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicator */}
      {/* <div className="absolute top-6 right-26 z-9 bg-white/90 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
        <span className="text-blue-600">{activeIndex + 1}</span>
        <span className="text-gray-500"> / {slides.length}</span>
      </div> */}
    </section>
  );
};

export default Banner;
