import React from "react";
import { Link, useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="mb-8 text-7xl font-barlow-thin text-gray-900">
          {error?.status || 404}
        </h1>
        <p className="mb-3 text-xl font-barlow-bold text-gray-900 md:text-2xl">
          {error?.error?.message || "Something Went Wrong!"}
        </p>
        <Link className="btn bg-gray-900 text-white hover:bg-gray-950" to="/">
          Go To Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
