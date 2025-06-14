import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <ScaleLoader />
    </div>
  );
};

export default Spinner;
