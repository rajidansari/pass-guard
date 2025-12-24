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

    // if already logged in, redirect to /dashboard
    useEffect(() => {
        if (user) {
            return navigate("/dashboard");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            return setError("Both fields are required.");
        }

        const user = {
            email,
            password,
        };

        try {
            const response = await axios.post(
                `${BASE_URI}/user/sign-in`,
                user,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                toast("Loggon in");
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                setUser(response.data.user);
                navigate("/dashboard");
            }
        } catch (error) {
            toast("Something went wrong, try again.");
            setError("Invalid email or passowrd.");
            console.log(`sign-in error :: ${error}`);
        } finally {
            setLoading(false);
            // reset inputs
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            {/* seo content */}
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
                <meta
                    property="og:url"
                    content="https://passguard0.vercel.app/login"
                />
            </Helmet>

            <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 px-2">
                <ToastContainer theme="dark" />
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl py-10 px-5 rounded-md shadow-2xl bg-light transition-all duration-300">
                    <div className="mb-10 flex flex-col items-center">
                        <img
                            src="pass_guard.png"
                            alt=""
                            width={45}
                            className="rounded-md"
                        />
                        <h1 className="text-2xl text-dark font-outfit font-semibold text-center">
                            Welcome back to PassGuard
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 text-center">
                            Log in to access your encrypted vault.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Input
                                type={"email"}
                                value={email}
                                setValue={setEmail}
                                placeHolder={"Enter your Email"}
                                required={true}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                type={showPassword ? "test" : "password"}
                                value={password}
                                setValue={setPassword}
                                placeHolder={"Enter your Password"}
                                required={true}
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-2 right-3 cursor-pointer  text-xl"
                            >
                                {showPassword ? (
                                    <FaEyeSlash title="Hide" />
                                ) : (
                                    <FaEye title="See" />
                                )}
                            </span>
                        </div>
                        <div className="mt-5 flex flex-col sm:flex-row gap-2 text-sm text-gray-600 font-semibold items-center justify-between">
                            <div className="flex gap-1">
                                <p>New here?</p>
                                <Link
                                    to={"/signup"}
                                    className="text-primary underline"
                                >
                                    Create account
                                </Link>
                            </div>
                            <div className="flex gap-1">
                                <p>Forgot password?</p>
                                <Link to={"/user/password/forgot/reset"} className="text-primary underline">reset here</Link>
                            </div>
                        </div>
                        <div className="mt-10 h-10">
                            <div className="text-red-500 text-sm text-center my-2">
                                {error ? error : null}
                            </div>
                            <button
                                className={`px-10 w-full bg-primary text-light py-2 rounded-md hover:bg-secondary cursor-pointer text-center transition-all duration-200`}
                            >
                                Start <span className="">→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
