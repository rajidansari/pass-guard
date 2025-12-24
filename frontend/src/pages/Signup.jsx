import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        setLoading(true);

        if (!fullname || !email || !password) {
            setLoading(false);
            return setError("All fields are required.");
        }

        if (password.length < 8) {
            setLoading(false);
            return setError("Password must should be atleast 8 characters");
        }

        if (!isValidEmail(email)) {
            setLoading(false);
            return setError("Invalid Email");
        }

        const newUser = {
            fullname,
            email,
            password,
        };

        try {
            const response = await axios.post(
                `${BASE_URI}/user/register`,
                newUser,
                { withCredentials: true }
            );

            if (response.status === 201) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                setUser(response.data.user);
                navigate("/dashboard");
            } else {
                setError("Email is already registered");
            }
        } catch (error) {
            console.log(`signup :: ${error}`);
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

            <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 px-2">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl py-8 px-4 sm:px-8 rounded-md shadow-2xl bg-light flex flex-col justify-center">
                    <div className="mb-10 text-center flex flex-col items-center">
                        <img
                            src="pass_guard.png"
                            alt=""
                            width={45}
                            className="rounded-md"
                        />
                        <h1 className="text-2xl md:text-3xl text-dark font-poppins font-semibold mt-2">
                            Sign up & Start{" "}
                            <span className="text-primary">Encrypting</span>{" "}
                            your Passwords. 🔒
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Input
                                value={fullname}
                                setValue={setFullname}
                                type={"text"}
                                placeHolder={"Enter your Full Name"}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                value={email}
                                setValue={setEmail}
                                type={"email"}
                                placeHolder={"Enter your Email"}
                            />
                        </div>
                        <div className="mb-3 relative">
                            <Input
                                type={showPassword ? "test" : "password"}
                                value={password}
                                setValue={setPassword}
                                placeHolder={"Enter your Password"}
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
                        <div className="mt-5 flex flex-col sm:flex-row gap-2 text-sm text-gray-600 font-semibold items-center">
                            <p>Already have an account?</p>
                            <Link
                                to={"/login"}
                                className="text-primary underline"
                            >
                                sign In
                            </Link>
                        </div>
                        <div className="mt-10 h-10">
                            <div className="text-red-500 font-semibold font-outfit text-sm text-center my-2">
                                {error ? error : null}
                            </div>
                            <button
                                className={`
                                px-10 w-full bg-primary text-light py-2 rounded-md
                                hover:bg-secondary cursor-pointer text-center relative font-outfit
                                transition-all duration-200
                            `}
                            >
                                {loading ? (
                                    <span className="loader"></span>
                                ) : (
                                    `Start Securing`
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
