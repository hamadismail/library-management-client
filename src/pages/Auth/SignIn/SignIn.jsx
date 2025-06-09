import React, { useState } from "react";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";
import useTitle from "../../../hooks/useTitle";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signInUser, signInWithGoogle, loading, setLoading } = useAuth();

  useTitle("SignIn || Redora");

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "SignIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top",
          icon: "error",
          title: error.code,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "SignIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top",
          icon: "error",
          title: error.code,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  if (loading) return <Spinner />;
  return (
    <div className="w-11/12 max-w-lg mx-auto py-12">
      <h2 className="text-xl font-barlow-bold text-center mb-4">
        Log in to your Account
      </h2>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-sm w-full"
      >
        <FaGoogle className="mr-2" /> Google
      </button>
      <div className="divider">or continue with email</div>
      <form onSubmit={handleSignIn} className="space-y-4">
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
              required
            />
            <FaEnvelope className="absolute top-3 left-3 text-gray-400 z-10" />
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
              required
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
        </div>
        <div className="flex justify-between items-center">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox mr-2" /> Remember me
          </label>
          <a href="#" className="link text-blue-600">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="btn bg-gray-900 text-white w-full font-barlow-medium font-normal"
        >
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
