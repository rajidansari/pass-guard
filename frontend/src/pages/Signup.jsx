import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/UserContextProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { BASE_URI } from "../config";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser, showPassword, setShowPassword } = useAuth();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullname || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const newUser = {
      fullname,
      email,
      password,
    };

    try {
      const response = await axios.post(`${BASE_URI}/user/register`, newUser, {
        withCredentials: true,
      });

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(`signup :: ${error}`);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
      setFullname("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup | PassGuard</title>

        <meta
          name="description"
          content="Create your free PassGuard account and start securing your passwords with end-to-end encryption."
        />

        <meta property="og:title" content="Signup to PassGuard" />

        <meta
          property="og:description"
          content="Secure your passwords with PassGuard's encrypted vault."
        />

        <meta
          property="og:image"
          content="https://passguard0.vercel.app/og-image.png"
        />

        <meta
          property="og:url"
          content="https://passguard0.vercel.app/signup"
        />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo / Heading */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
              <img
                src="/pass_guard.png"
                alt="PassGuard"
                width={34}
                className="rounded-md"
              />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 font-outfit text-center">
              Create your account
            </h1>

            <p className="mt-1 text-sm text-gray-500 font-outfit text-center">
              Start securing your passwords with PassGuard.
            </p>
          </div>

          {/* Signup Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700 font-outfit">
                  Full name
                </label>

                <Input
                  value={fullname}
                  setValue={setFullname}
                  type="text"
                  placeHolder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700 font-outfit">
                  Email
                </label>

                <Input
                  value={email}
                  setValue={setEmail}
                  type="email"
                  placeHolder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 font-outfit">
                  Password
                </label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    setValue={setPassword}
                    placeHolder="Create a password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400 font-outfit">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Error */}
              <div className="min-h-7 mt-4">
                {error && (
                  <p className="text-center text-sm text-red-500 font-outfit">
                    {error}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <p className="text-sm text-gray-500 font-outfit">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-gray-900 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400 font-outfit">
            Your credentials are protected by PassGuard.
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
