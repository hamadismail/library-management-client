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
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, setUser } = useAuth();

  const handleRegister = (data) => {
    const name = data.name;
    const email = data.mail;
    const photo = data.photo;
    const password = data.password;

    createUser(email, password)
      .then((result) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        const userInfo = result.user;

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...userInfo, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            setUser(userInfo);
          });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code);
      });
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
              {...register("photo")}
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
