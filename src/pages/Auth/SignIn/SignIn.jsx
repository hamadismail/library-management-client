import React, { useState } from "react";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-11/12 max-w-lg mx-auto py-12">
      <h2 className="text-xl font-bold text-center mb-4">
        Log in to your Account
      </h2>
      <button className="btn btn-outline btn-sm w-full">
        <FaGoogle className="mr-2" /> Google
      </button>
      <div className="divider">or continue with email</div>
      <form className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full pl-10"
            />
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pl-10"
            />
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-400 cursor-pointer z-10"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-400 cursor-pointer z-10"
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox mr-2" /> Remember me
          </label>
          <a href="#" className="link text-blue-600">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Log in
        </button>
      </form>
      <div className="mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="link text-blue-600">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
