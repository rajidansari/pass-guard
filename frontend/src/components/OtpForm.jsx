import axios from "axios";
import { BASE_URI } from "../config";
import Loader from "./Loader";
import { useRef } from "react";
import { useFormAnimation } from "./useFormAnimation";

const OtpForm = ({
    otp,
    setOtp,
    loading,
    setLoading,
    error,
    setError,
    setStep,
}) => {
    const formRef = useRef(null);
    useFormAnimation(formRef);

    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(
                `${BASE_URI}/user/password/forgot/reset/otp-verification`,
                { otp }
            );
            console.log(response.data.message);
            setLoading(false);
            setStep(3);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black px-4">
            
            {error && <div className="absolute top-3 right-3 bg-gray-100 rounded-xl px-4 py-2 text-red-500 transition-all duration-200 ease-in">{error}</div>}

            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
            </div>

            {/* Card */}
            <div className="relative w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl p-8">
                <h1 className="text-3xl font-semibold text-white text-center mb-2">
                    Verify OTP
                </h1>

                <p className="text-sm text-zinc-400 text-center mb-8">
                    Check your email for reset password otp
                </p>

                <form className="space-y-6" ref={formRef} onSubmit={verifyOtp}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="● ● ● ●"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white
          border border-zinc-700 focus:outline-none focus:ring-2
          focus:ring-blue-500 placeholder-zinc-500 text-center tracking-[10px]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium
        hover:bg-blue-700 transition active:scale-[0.98]"
                    >
                        {loading ? <Loader /> : "Next"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpForm;
