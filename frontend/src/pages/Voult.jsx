import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosCopy } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { HiPencilSquare } from "react-icons/hi2";
import { FiSearch, FiLock, FiMoreVertical } from "react-icons/fi";
import { useAuth } from "../contexts/UserContextProvider";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URI } from "../config";

const Voult = () => {
  const [voults, setVoults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { user } = useAuth();

  const getPasswords = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/password/my-passwords`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setVoults(response.data.reverse());
      }
    } catch (error) {
      console.log(`Error while password fetching ${error}`);
      toast.error("Unable to load your vault.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Copied to clipboard", {
        autoClose: 1800,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Unable to copy.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`${BASE_URI}/password/delete/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setVoults((prev) => prev.filter((voult) => voult._id !== id));

        toast.success("Password deleted.", {
          autoClose: 1800,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error(`password deletion error :: ${error}`);
    }
  };

  const handleUpdate = () => {
    toast.info(
      "Editing is currently unavailable. Delete this entry and add it again.",
      {
        autoClose: 2500,
        hideProgressBar: true,
      },
    );
  };

  const filteredVoults = voults.filter((voult) => {
    const query = search.toLowerCase();

    return (
      voult.site?.toLowerCase().includes(query) ||
      voult.username?.toLowerCase().includes(query)
    );
  });

  return (
    <main className="h-screen w-full bg-[#fafafa] font-outfit overflow-hidden">
      <ToastContainer />

      {/* ───────────── Navbar ───────────── */}
      <nav className="h-16 bg-white border-b border-gray-200">
        <div className="h-full px-4 md:px-7 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl overflow-hidden border border-gray-200">
              <img
                src="pass_guard.png"
                alt="PassGuard"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="hidden sm:block text-xl font-semibold tracking-tight">
              PassGuard
            </h2>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-[11px] text-gray-400">Signed in as</p>

              <p className="text-sm font-medium text-gray-800">
                {user.fullname}
              </p>
            </div>

            <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <CgProfile className="text-lg text-gray-600" />
            </div>
          </div>
        </div>
      </nav>

      {/* ───────────── Layout ───────────── */}
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[235px] shrink-0 bg-white border-r border-gray-200">
          <div className="h-full sticky top-0">
            <Sidebar />
          </div>
        </aside>

        {/* ───────────── Main ───────────── */}
        <section className="flex-1 min-w-0 min-h-0 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-7 md:py-9">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiLock className="text-emerald-600 text-sm" />

                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Password Vault
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                  All credentials
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  View and manage everything stored in your vault.
                </p>
              </div>

              {/* Search */}
              <div
                className="
                                w-full md:w-[280px]
                                h-10
                                flex items-center gap-2
                                px-3
                                rounded-xl
                                bg-white
                                border border-gray-200
                                focus-within:border-gray-400
                                transition-colors
                            "
              >
                <FiSearch className="text-gray-400 flex-shrink-0" />

                <input
                  type="text"
                  placeholder="Search credentials..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                                        w-full
                                        bg-transparent
                                        outline-none
                                        text-sm
                                        text-gray-800
                                        placeholder:text-gray-400
                                    "
                />
              </div>
            </div>

            {/* Vault Summary */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Credentials
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  {filteredVoults.length}{" "}
                  {filteredVoults.length === 1 ? "credential" : "credentials"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Vault protected
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
                                            h-[190px]
                                            rounded-2xl
                                            bg-white
                                            border border-gray-200
                                            animate-pulse
                                        "
                  />
                ))}
              </div>
            ) : filteredVoults.length > 0 ? (
              /* ───────────── Credential Cards ───────────── */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredVoults.map((voult) => (
                  <article
                    key={voult._id}
                    className="
                                            group
                                            bg-white
                                            border border-gray-200
                                            rounded-2xl
                                            p-5
                                            transition-all duration-200
                                            hover:border-gray-300
                                            hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                                        "
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="
                                                    h-11 w-11
                                                    flex-shrink-0
                                                    rounded-xl
                                                    bg-gray-50
                                                    border border-gray-200
                                                    flex items-center justify-center
                                                    text-sm font-semibold
                                                    text-gray-600
                                                "
                        >
                          {voult.site?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 truncate">
                            {voult.site}
                          </h3>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Login credential
                          </p>
                        </div>
                      </div>

                      {/* Menu */}
                      <button
                        className="
                                                    h-8 w-8
                                                    flex items-center justify-center
                                                    rounded-lg
                                                    text-gray-400
                                                    hover:text-gray-700
                                                    hover:bg-gray-100
                                                    transition-colors
                                                    cursor-pointer
                                                "
                      >
                        <FiMoreVertical />
                      </button>
                    </div>

                    {/* Username */}
                    <div className="mb-5">
                      <p
                        className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                                mb-1.5
                                            "
                      >
                        Username
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-gray-700 truncate">
                          {voult.username}
                        </p>

                        <button
                          onClick={() => handleCopy(voult.username)}
                          className="
                                                        flex-shrink-0
                                                        text-gray-400
                                                        hover:text-gray-800
                                                        transition-colors
                                                        cursor-pointer
                                                    "
                        >
                          <IoIosCopy
                            title="Copy username"
                            className="text-base"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <p
                        className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                                mb-1.5
                                            "
                      >
                        Password
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <p
                          className="
                                                    text-sm
                                                    text-gray-700
                                                    tracking-[3px]
                                                    truncate
                                                "
                        >
                          ••••••••••••
                        </p>

                        <button
                          onClick={() => handleCopy(voult.password)}
                          className="
                                                        flex-shrink-0
                                                        text-gray-400
                                                        hover:text-gray-800
                                                        transition-colors
                                                        cursor-pointer
                                                    "
                        >
                          <IoIosCopy
                            title="Copy password"
                            className="text-base"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div
                      className="
                                            mt-5
                                            pt-4
                                            border-t border-gray-100
                                            flex items-center justify-between
                                        "
                    >
                      <button
                        onClick={handleUpdate}
                        className="
                                                    flex items-center gap-1.5
                                                    text-xs
                                                    text-gray-500
                                                    hover:text-gray-900
                                                    transition-colors
                                                    cursor-pointer
                                                "
                      >
                        <HiPencilSquare className="text-sm" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(voult._id)}
                        className="
                                                    flex items-center gap-1.5
                                                    text-xs
                                                    text-gray-400
                                                    hover:text-red-600
                                                    transition-colors
                                                    cursor-pointer
                                                "
                      >
                        <MdDeleteOutline className="text-base" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* ───────────── Empty State ───────────── */
              <div
                className="
                                min-h-[340px]
                                bg-white
                                border border-dashed border-gray-300
                                rounded-2xl
                                flex flex-col
                                items-center justify-center
                                text-center
                                px-6
                            "
              >
                <div
                  className="
                                    h-12 w-12
                                    rounded-xl
                                    bg-gray-50
                                    border border-gray-200
                                    flex items-center justify-center
                                    mb-4
                                "
                >
                  <FiLock className="text-gray-500" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  {search ? "No credentials found" : "Your vault is empty"}
                </h3>

                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                  {search
                    ? "Try searching with a different site or username."
                    : "Passwords you add to PassGuard will appear here."}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Voult;
