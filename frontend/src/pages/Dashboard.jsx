import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/UserContextProvider";
import { VscAdd } from "react-icons/vsc";
import axios from "axios";
import AddPassword from "../components/AddPassword";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CgProfile } from "react-icons/cg";
import { Helmet } from "react-helmet";
import { BASE_URI } from "../config";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [voults, setVoults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPasswordPanel, setShowAddPasswordPanel] = useState(false);

  const addPenelRef = useRef(null);

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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPasswords();
  }, []);

  useGSAP(() => {
    if (showAddPasswordPanel) {
      gsap.to(addPenelRef.current, {
        scale: "1",
      });
    } else {
      gsap.to(addPenelRef.current, {
        scale: "0",
      });
    }
  }, [showAddPasswordPanel]);

  // copy password
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);

    toast.success("Copied to clipboard", {
      autoClose: 1800,
      hideProgressBar: true,
    });
  };

  return (
    <>
      {/* seo content */}
      <Helmet>
        <title>Dashboard | PassGuard</title>
        <meta
          name="description"
          content="Your secure dashboard to manage saved passwords and credentials with PassGuard."
        />
        <meta property="og:title" content="Dashboard | PassGuard" />
        <meta
          property="og:description"
          content="Your secure dashboard to manage saved passwords."
        />
        <meta
          property="og:image"
          content="https://passguard0.vercel.app/og-image.png"
        />
        <meta
          property="og:url"
          content="https://passguard0.vercel.app/dashboard"
        />
      </Helmet>

      <main className="min-h-screen w-full bg-[#fafafa] text-[#171717] flex flex-col font-outfit">
        <ToastContainer />
        {/* ───────────── Navbar ───────────── */}
        <nav className="h-16 w-full bg-white border-b border-gray-200 flex-shrink-0 z-20">
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

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-500">
                <span className="text-xs">⌘</span>
                Search
                <span className="text-xs text-gray-400">K</span>
              </div>

              <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                <CgProfile className="text-lg text-gray-600" />
              </div>

              <div className="hidden sm:block leading-tight">
                <p className="text-[11px] text-gray-400">Signed in as</p>
                <p className="text-sm font-medium text-gray-800 max-w-[150px] truncate">
                  {user.fullname}
                </p>
              </div>
            </div>
          </div>
        </nav>

        {/* ───────────── Body ───────────── */}
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Sidebar */}
          <aside className="w-0 lg:w-[235px] shrink-0 bg-white">
            <div className="h-full lg:sticky lg:top-0">
              <Sidebar />
            </div>
          </aside>

          {/* ───────────── Main Content ───────────── */}
          <section className="flex-1 min-w-0 min-h-0 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-7 md:py-9">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Secure Vault
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                    Your passwords
                  </h1>

                  <p className="mt-1.5 text-sm text-gray-500">
                    Manage your saved credentials securely.
                  </p>
                </div>

                {/* Add Button */}
                <button
                  onClick={() => setShowAddPasswordPanel(true)}
                  className="
                            w-fit
                            flex items-center gap-2
                            px-4 py-2.5
                            rounded-xl
                            bg-[#171717]
                            hover:bg-[#292929]
                            text-white
                            text-sm font-medium
                            transition-all duration-200
                            shadow-sm
                            active:scale-[0.98]
                            cursor-pointer
                        "
                >
                  <VscAdd className="h-4 w-4" />
                  Add password
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-4">
                  <p className="text-xs text-gray-400 mb-1">Total passwords</p>

                  <p className="text-2xl font-semibold text-gray-900">
                    {voults.length}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl px-4 py-4">
                  <p className="text-xs text-gray-400 mb-1">Vault status</p>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                    <p className="text-sm font-medium text-gray-800">
                      Protected
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl px-4 py-4">
                  <p className="text-xs text-gray-400 mb-1">Storage</p>

                  <p className="text-sm font-medium text-gray-800">
                    Encrypted vault
                  </p>
                </div>
              </div>

              {/* Vault Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Saved credentials
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Your encrypted login information
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {voults.length} {voults.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Vault Cards */}
              {voults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {voults.map((voult) => (
                    <div
                      key={voult._id}
                      className="
                                    group
                                    bg-white
                                    border border-gray-200
                                    rounded-2xl
                                    p-4
                                    transition-all duration-200
                                    hover:border-gray-300
                                    hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                                "
                    >
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="
                                            h-10 w-10
                                            flex-shrink-0
                                            rounded-xl
                                            bg-gray-50
                                            border border-gray-200
                                            flex items-center justify-center
                                            text-sm font-semibold text-gray-600
                                        "
                          >
                            {voult.site?.charAt(0)?.toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {voult.site}
                            </h3>

                            <p className="text-xs text-gray-400 mt-0.5">
                              Login credential
                            </p>
                          </div>
                        </div>

                        <button
                          className="
                                            opacity-0
                                            group-hover:opacity-100
                                            h-8 w-8
                                            flex items-center justify-center
                                            rounded-lg
                                            hover:bg-gray-100
                                            text-gray-400
                                            hover:text-gray-700
                                            transition-all
                                            cursor-pointer
                                        "
                        >
                          •••
                        </button>
                      </div>

                      {/* Username */}
                      <div className="mb-4">
                        <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                          Username
                        </p>

                        <p className="text-sm text-gray-700 truncate">
                          {voult.username}
                        </p>
                      </div>

                      {/* Password */}
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                          Password
                        </p>

                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="password"
                            value={voult.password}
                            disabled
                            className="
                                                min-w-0
                                                flex-1
                                                text-sm
                                                text-gray-700
                                                outline-none
                                                bg-transparent
                                                tracking-[3px]
                                            "
                          />

                          <button
                            onClick={() => handleCopy(voult.password)}
                            className="flex-shrink-0 text-xs
                                                font-medium
                                                text-gray-400
                                                hover:text-gray-800
                                                transition-colors
                                                cursor-pointer
                                            "
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div
                  className="
                        min-h-[320px]
                        bg-white
                        border border-dashed border-gray-300
                        rounded-2xl
                        flex flex-col items-center justify-center
                        text-center px-6
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
                    <span className="text-lg">🔐</span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900">
                    Your vault is empty
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    Add your first password and keep your credentials securely
                    stored in one place.
                  </p>

                  <button
                    onClick={() => setShowAddPasswordPanel(true)}
                    className="
                                mt-5
                                px-4 py-2
                                rounded-lg
                                bg-gray-900
                                text-white
                                text-xs font-medium
                                hover:bg-gray-800
                                transition-colors
                                cursor-pointer
                            "
                  >
                    Add your first password
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Add Password */}
        <AddPassword
          showPasswordPanel={showAddPasswordPanel}
          setShowPasswordPanel={setShowAddPasswordPanel}
          ref={addPenelRef}
        />
      </main>
    </>
  );
};

export default Dashboard;
