import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slide from "./Slide";
import { GrNext, GrPrevious } from "react-icons/gr";
import slide1 from "../../../assets/img/slide1.jpg";
import slide2 from "../../../assets/img/slide2.jpg";
import slide3 from "../../../assets/img/slide3.jpg";

const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const slides = [
    {
      title: "Discover Thousands of Books",
      subtitle:
        "Explore our vast collection and borrow your favorite titles anytime, anywhere.",
      button: {
        text: "Browse Now",
        link: "/all-books",
      },
      image: slide1,
    },
    {
      title: "Contribute to the Library",
      subtitle:
        "Have a book to share? Add it to our growing digital library and help others learn.",
      button: {
        text: "Add a Book",
        link: "/add-book",
      },
      image: slide2,
    },
    {
      title: "Manage Your Borrowed Books",
      subtitle:
        "Track and manage your borrowed books easily through your personal dashboard.",
      button: {
        text: "My Books",
        link: "/borrowed-books",
      },
      image: slide3,
    },
  ];

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] py-16">
      {swiperReady && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-lg shadow-md w-11/12 mx-auto"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Slide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-center gap-6 mt-6 text-gray-950">
        <button
          ref={prevRef}
          className="cursor-pointer px-4 py-2 rounded bg-white border shadow hover:bg-gray-900 hover:text-white transition"
        >
          <GrPrevious />
        </button>
        <button
          ref={nextRef}
          className="cursor-pointer px-4 py-2 rounded bg-white border shadow hover:bg-gray-900 hover:text-white transition"
        >
          <GrNext />
        </button>
      </div>
    </section>
  );
};

export default Banner;
