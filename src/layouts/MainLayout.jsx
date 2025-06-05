import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="font-barlow">
      <Header />
      <div className="mt-[64px] min-h-[calc(100vh-433px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
