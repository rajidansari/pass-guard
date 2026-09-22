import React, { useState } from "react";
import { useAuth } from "../contexts/UserContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import generatePassword from "../../utils/generatePassword";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { BASE_URI } from "../config";

const AddPassword = React.forwardRef(
  ({ showPasswordPanel, setShowPasswordPanel, voult }, ref) => {
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { showPassword, setShowPassword } = useAuth();

    const savePassword = async (e) => {
      e.preventDefault();
      setError("");

      if (!site || !password) {
        setError("Site and password are required.");
        toast.error("Site and password are required.");
        return;
      }

      const voultData = {
        site,
        username,
        password,
      };

      try {
        setLoading(true);

        const response = await axios.post(
          `${BASE_URI}/password/save`,
          voultData,
          { withCredentials: true },
        );

        if (response.status === 201) {
          toast.success("Password saved successfully.");
          setShowPasswordPanel(false);

          // Temporary quick fix
          window.location.reload();
        }
      } catch (error) {
        console.error(`password save error ${error}`);
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      } finally {
        setLoading(false);
        setSite("");
        setUsername("");
        setPassword("");
      }
    };

    const handlePasswordGenerate = () => {
      const generatedPassword = generatePassword();
      setPassword(generatedPassword);
      setShowPassword(true);
    };

    if (!showPasswordPanel) return null;

    return (
      <>
        <ToastContainer />

        <div
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 font-outfit">
                  Add password
                </h2>

                <p className="mt-1 text-sm text-gray-500 font-outfit">
                  Securely save a new credential to your vault.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordPanel(false)}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                aria-label="Close"
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={savePassword} className="px-6 py-6">
              {/* Site */}
              <div className="mb-5">
                <label
                  htmlFor="site"
                  className="mb-2 block text-sm font-medium text-gray-700 font-outfit"
                >
                  Website / App
                  <span className="ml-1 text-emerald-600">*</span>
                </label>

                <input
                  type="text"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  placeholder="e.g. LinkedIn"
                  id="site"
                  name="site"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* Username */}
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700 font-outfit"
                >
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. john_doe"
                  id="username"
                  name="username"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 font-outfit"
                >
                  Password
                  <span className="ml-1 text-emerald-600">*</span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-24 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                  />

                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={15} />
                      ) : (
                        <FaEye size={15} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handlePasswordGenerate}
                      className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50 cursor-pointer"
                    >
                      <FiRefreshCw size={13} />
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="mb-4 text-sm text-red-500 font-outfit">{error}</p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordPanel(false)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Saving..." : "Save password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  },
);

export default AddPassword;
