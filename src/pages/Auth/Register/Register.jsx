import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLink,
} from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (e) => {
    // e.preventDefault();
    // const form = e.target;
    // const email = form.email.value;
    // const password = form.password.value;
    // const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    // const isValidate = pattern.test(password);
    // if (!isValidate)
    //   return toast.error(
    //     "Password Must be 6 character long and a uppercase letter and a lowercase letter"
    //   );

    toast.success("login successfully");
  };
  return (
    <div className="w-11/12 max-w-lg mx-auto py-12">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-xl font-bold text-center mb-4">
        Create a New Account
      </h2>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full pl-10"
              name="name"
              {...register("name", { required: "Name is required" })}
            />
            <FaUser className="absolute top-3 left-3 text-gray-400 z-10" />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full pl-10"
              name="email"
              {...register("mail", { required: "Email Address is required" })}
            />
            <FaEnvelope className="absolute top-3 left-3 text-gray-400 z-10" />
          </div>
          {errors.mail && (
            <p className="text-red-500 text-sm mt-1">{errors.mail.message}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <div className="relative">
            <input
              type="url"
              placeholder="Photo Url"
              className="input input-bordered w-full pl-10"
              name="photo"
            />
            <FaLink className="absolute top-3 left-3 text-gray-400 z-10" />
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
              name="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Password must be at least 6 characters with uppercase and lowercase letters",
                },
              })}
            />
            <FaLock className="absolute top-3 left-3 text-gray-400 z-10" />
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
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
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/signin" className="link text-blue-600">
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Register;
