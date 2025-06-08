import React from "react";
import Header from "../components/Header/Header";
import { Outlet, useNavigation } from "react-router";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/ui/Spinner";

const MainLayout = () => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="font-barlow">
      <Header />
      {isNavigating ? (
        <Spinner />
      ) : (
        <div className="mt-[64px] min-h-[calc(100vh-433px)]">
          <Outlet />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;
