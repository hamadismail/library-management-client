import React from "react";
import Banner from "./Banner/Banner";
import Testimonials from "./Testimonials/Testimonials";
import HowItWorks from "./HowItWorks/HowItWorks";
import BookCategories from "./BookCategories/BookCategories";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Redora");
  return (
    <div>
      <Banner />
      <BookCategories />
      <Testimonials />
      <HowItWorks />
    </div>
  );
};

export default Home;
