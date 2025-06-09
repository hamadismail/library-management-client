import React from "react";
import Banner from "./Banner/Banner";
import Testimonials from "./Testimonials/Testimonials";
import HowItWorks from "./HowItWorks/HowItWorks";
import BookCategories from "./BookCategories/BookCategories";

const Home = () => {
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
