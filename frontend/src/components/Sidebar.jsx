import React, { useState } from "react";
import { IoMdMenu, IoMdClose, IoIosLock } from "react-icons/io";
import { FiHome, FiShield, FiKey, FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Vault",
      path: "/voult",
      icon: FiShield,
    },
  ];

  return (
    <>
      {/* ───────────── Mobile Menu Button ───────────── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          className="
                        fixed
                        top-[4.5rem]
                        right-4
                        z-30
                        lg:hidden
                        h-9 w-9
                        flex items-center justify-center
                        rounded-lg
                        bg-white
                        border border-gray-200
                        text-gray-600
                        shadow-sm
                        hover:bg-gray-50
                        transition-colors
                    "
        >
          <IoMdMenu size={21} />
        </button>
      )}

      {/* ───────────── Overlay ───────────── */}
      {open && (
        <div
          className="
                        fixed inset-0
                        bg-black/20
                        backdrop-blur-[2px]
                        z-40
                        lg:hidden
                    "
          onClick={() => setOpen(false)}
        />
      )}

      {/* ───────────── Sidebar ───────────── */}
      <aside
        className={`
        fixed
        top-0
        left-0
        z-50
        h-screen
        w-[250px]
        bg-white
        border-r border-gray-200
        flex flex-col
        transition-transform
        duration-300
        ease-out

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:static
        lg:h-full
        lg:w-full
        lg:translate-x-0
        lg:border-r-0
    `}
      >
        {/* ───────────── Mobile Header ───────────── */}
        <div
          className="
                    h-16
                    px-5
                    flex items-center justify-between
                    border-b border-gray-100
                    lg:hidden
                "
        >
          <div className="flex items-center gap-2.5">
            <div
              className="
                            h-8 w-8
                            rounded-lg
                            overflow-hidden
                            border border-gray-200
                        "
            >
              <img
                src="/pass_guard.png"
                alt="PassGuard"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-semibold text-gray-900">PassGuard</span>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="
                            h-8 w-8
                            rounded-lg
                            flex items-center justify-center
                            text-gray-400
                            hover:text-gray-800
                            hover:bg-gray-100
                            transition-colors
                        "
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* ───────────── Navigation ───────────── */}
        <div className="flex-1 px-3 py-5">
          <p
            className="
                        px-3
                        mb-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-gray-400
                    "
          >
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `
                                        group
                                        flex items-center gap-3
                                        w-full
                                        px-3 py-2.5
                                        rounded-lg
                                        text-sm
                                        transition-all duration-150

                                        ${
                                          isActive
                                            ? "bg-gray-100 text-gray-900 font-medium"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        }
                                    `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`
                                                    text-[17px]
                                                    ${
                                                      isActive
                                                        ? "text-gray-800"
                                                        : "text-gray-400 group-hover:text-gray-600"
                                                    }
                                                `}
                      />

                      <span>{item.name}</span>

                      {isActive && (
                        <span
                          className="
                                                    ml-auto
                                                    h-1.5 w-1.5
                                                    rounded-full
                                                    bg-emerald-500
                                                "
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* Password Generator */}
            <button
              type="button"
              onClick={() => alert("Password generator coming soon.")}
              className="
                                group
                                flex items-center gap-3
                                w-full
                                px-3 py-2.5
                                rounded-lg
                                text-sm
                                text-gray-500
                                hover:bg-gray-50
                                hover:text-gray-900
                                transition-all duration-150
                                cursor-pointer
                            "
            >
              <FiKey
                className="
                                text-[17px]
                                text-gray-400
                                group-hover:text-gray-600
                            "
              />

              <span>Generate Password</span>
            </button>
          </nav>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-6" />

          {/* Settings */}
          <p
            className="
                        px-3
                        mb-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-gray-400
                    "
          >
            Account
          </p>

          <button
            type="button"
            className="
                            group
                            flex items-center gap-3
                            w-full
                            px-3 py-2.5
                            rounded-lg
                            text-sm
                            text-gray-500
                            hover:bg-gray-50
                            hover:text-gray-900
                            transition-all duration-150
                            cursor-pointer
                        "
          >
            <FiSettings
              className="
                            text-[17px]
                            text-gray-400
                            group-hover:text-gray-600
                        "
            />

            <span>Settings</span>
          </button>
        </div>

        {/* ───────────── Security Status ───────────── */}
        <div className="px-4 pb-3">
          <div
            className="
                        p-3
                        rounded-xl
                        bg-emerald-50
                        border border-emerald-100
                    "
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="
                                h-7 w-7
                                rounded-lg
                                bg-white
                                border border-emerald-100
                                flex items-center justify-center
                            "
              >
                <IoIosLock className="text-emerald-600 text-sm" />
              </div>

              <span
                className="
                                text-xs
                                font-semibold
                                text-emerald-800
                            "
              >
                Vault protected
              </span>
            </div>

            <p
              className="
                            text-[10px]
                            leading-relaxed
                            text-emerald-700/70
                            pl-9
                        "
            >
              Your credentials are securely stored.
            </p>
          </div>
        </div>

        {/* ───────────── Logout ───────────── */}
        <div
          className="
                    px-3 py-3
                    border-t border-gray-100
                "
        >
          <LogOut className="w-full" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
