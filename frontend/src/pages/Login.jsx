import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/UserContextProvider";
import { ToastContainer, toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { BASE_URI } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser, showPassword, setShowPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${BASE_URI}/user/sign-in`, userData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Logged in successfully.");

        localStorage.setItem("user", JSON.stringify(response.data.user));

        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong, try again.");
      setError("Invalid email or password.");
      console.log(`sign-in error :: ${error}`);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | PassGuard</title>

        <meta
          name="description"
          content="Securely login to your PassGuard account and access your encrypted passwords."
        />

        <meta property="og:title" content="Login to PassGuard" />

        <meta
          property="og:description"
          content="Access your encrypted vault of passwords on PassGuard."
        />

        <meta
          property="og:image"
          content="https://passguard0.vercel.app/og-image.png"
        />

        <meta property="og:url" content="https://passguard0.vercel.app/login" />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] px-4 py-8">
        <ToastContainer theme="dark" />

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

            <h1 className="text-2xl font-semibold text-gray-900 font-outfit">
              Welcome back
            </h1>

            <p className="mt-1 text-sm text-gray-500 font-outfit">
              Log in to access your secure vault.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700 font-outfit">
                  Email
                </label>

                <Input
                  type="email"
                  value={email}
                  setValue={setEmail}
                  placeHolder="Enter your email"
                  required={true}
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
                    placeHolder="Enter your password"
                    required={true}
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
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/user/password/forgot/reset"
                  className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Forgot password?
                </Link>
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Signup */}
            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <p className="text-sm text-gray-500 font-outfit">
                New to PassGuard?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-gray-900 hover:underline"
                >
                  Create an account
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

export default Login;
