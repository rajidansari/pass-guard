import React, { useState } from "react";
import { useAuth } from "../contexts/UserContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import generatePassword from "../../utils/generatePassword";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BASE_URI } from "../config";


const AddPassword = React.forwardRef(
    ({ showPasswordPanel, setShowPasswordPanel, voult }, ref) => {
        const [site, setSite] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        const {showPassword, setShowPassword} = useAuth();

        const savePassword = async (e) => {
            e.preventDefault();
            setError("");

            if (!site || !password) {
                setError("site and password field are required.");
				toast(error);
				return;
            }
            
            const voultData = {
                site,
                username,
                password,
            };
            

            try {
                const response = await axios.post(
                    `${BASE_URI}/password/save`,
                    voultData,
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    toast("Password saved");
                    setShowPasswordPanel(false);
                    window.location.reload(); // temporary quick fix
                }
            } catch (error) {
                console.error(`password save error ${error}`);
            } finally {
                setLoading(false);
                setSite("");
                setUsername("");
                setPassword("");
            }
        };

        const handlePasswordGenerate = () => {
            const password = generatePassword();
            setPassword(password);
        }

        return (
            <>
            <ToastContainer />
            <div
                ref={ref}
                className="fixed inset-0 scale-0 flex items-center justify-center z-10 bg-black/30"
            >
                <div className="w-[90vw] max-w-lg sm:w-2/3 md:w-1/2 lg:w-2/5 bg-gray-100 rounded-md overflow-hidden border border-gray-300 shadow-lg mx-2">
                <div className="flex items-center justify-center">
                    <div className="w-full sm:w-5/6 my-5 mx-4 sm:mx-8">
                    <h1 className="text-center text-primary text-2xl sm:text-3xl font-semibold font-poppins mb-4">
                        Secure Your Password with PassGuard
                    </h1>
                    <form onSubmit={savePassword}>
                        <label
                        htmlFor="site"
                        className="text-gray-700 font-outfit"
                        >
                        Site{" "}
                        <span className="text-accent text-sm">
                            *
                        </span>
                        </label>
                        <div className="bg-light mb-3">
                        <input
                            type="text"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                            placeholder="e.g. - LinkedIn"
                            id="site"
                            name="site"
                            required={true}
                            className="h-full w-full px-4 py-2 rounded-md outline-none border border-gray-400 text-gray-700 font-poppins"
                        />
                        </div>

                        <label
                        htmlFor="username"
                        className="text-gray-700 font-outfit"
                        >
                        Username
                        </label>
                        <div className="bg-light mb-3">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. - jhon_doe"
                            id="username"
                            name="username"
                            className="h-full w-full px-4 py-2 rounded-md outline-none border border-gray-400 text-gray-700 font-poppins"
                        />
                        </div>

                        <label
                        htmlFor="password"
                        className="text-gray-700 font-outfit"
                        >
                        Password{" "}
                        <span className="text-accent text-sm">
                            *
                        </span>
                        </label>
                        <div className="bg-light mb-3 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*********"
                            id="password"
                            name="password"
                            required={true}
                            className="h-full w-full px-4 py-2 rounded-md outline-none border border-gray-400 text-gray-700 font-poppins pr-24"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-2 right-24 text-xl cursor-pointer z-10 font-outfit"
                        >{showPassword ? <FaEyeSlash title="Hide" /> : <FaEye title="See" />}</span>
                        <span
                            onClick={handlePasswordGenerate}
                            className="absolute top-1 right-2 bg-accent active:bg-accent/90 text-light p-1 cursor-pointer rounded-md font-outfit"
                        >
                            {" "}
                            Generate{" "}
                        </span>
                        </div>
                        <div className="flex flex-col gap-2 flex-wrap items-center">
                        <button className="min-w-24 py-1 rounded-md bg-green-600 text-light text-lg cursor-pointer font-poppins font-semibold tracking-wide">
                            Save
                        </button>
                        <p
                            onClick={() =>
                            setShowPasswordPanel(false)
                            }
                            className="text-xs underline text-primary font-montserrat cursor-pointer"
                        >
                            Close
                        </p>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </>
        );
    }
);

export default AddPassword;
