import axios from "axios";
import { BASE_URI } from "../config";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Loader from "./Loader";
import { useFormAnimation } from "./useFormAnimation";
import gsap from "gsap";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";

const ChangePasswordForm = ({
    password,
    setPassword,
    loading,
    setLoading,
    error,
    setError,
    email,
}) => {
    const formRef = useRef(null);
    useFormAnimation(formRef);

    const confirmPasswordRef = useRef(null);

    const navigate = useNavigate();

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        if (password != confirmPassword) {
            setError("Confirm password mismatch");
            
            // focus to confirm password
            confirmPasswordRef.current?.focus();
            
            gsap.fromTo(
                confirmPasswordRef.current,
                { x: -6 },
                { x: 6, duration: 0.08, repeat: 4, yoyo: true }
            );

            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URI}/user/password/forgot/reset/update`,
                { email, password }
            );

            console.log(response.data.message);
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black px-4">
                {error && (
                    <div className="absolute top-3 right-3 bg-gray-100 rounded-xl px-4 py-2 text-red-500 transition-all duration-200 ease-in -translate-x-5">
                        {error}
                    </div>
                )}

                {/* Background glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
                </div>

                {/* Card */}
                <div className="relative w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl p-8 ">
                    <h1 className="text-3xl font-semibold text-white text-center mb-4">
                        Create New Password
                    </h1>

                    {/* <p className="text-sm text-zinc-400 text-center mb-8">
                        Check your email for reset password otp
                    </p> */}

                    <form
                        className="space-y-6"
                        ref={formRef}
                        onSubmit={changePassword}
                    >
                        <div className="relative space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white
          border border-zinc-700 focus:outline-none focus:ring-2
          focus:ring-blue-500 placeholder-zinc-500"
                                />
                                <span
                                    className="text-white absolute top-2/5 right-4 text-xl"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? (
                                        <MdOutlineRemoveRedEye />
                                    ) : (
                                        <LuEyeClosed />
                                    )}
                                </span>
                            </div>

                            <div className="relative">
                                <input
                                    ref={confirmPasswordRef}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className={`w-full px-4 py-3 rounded-xl bg-zinc-800 text-white
          border border-zinc-700 focus:outline-none focus:ring-2
           ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} placeholder-zinc-500 `}
                                />
                                <span
                                    className="text-white absolute top-2/5 right-4 text-xl"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? (
                                        <MdOutlineRemoveRedEye />
                                    ) : (
                                        <LuEyeClosed />
                                    )}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium
        hover:bg-blue-700 transition active:scale-[0.98]"
                        >
                            {loading ? <Loader /> : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordForm;
