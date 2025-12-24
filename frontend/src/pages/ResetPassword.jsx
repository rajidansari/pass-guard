import { useState } from "react";
import PasswordResetForm from "../components/PasswordResetForm";
import OtpForm from "../components/OtpForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <>
            {step == 1 && (
                <PasswordResetForm
                    email={email}
                    setEmail={setEmail}
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                    setStep={setStep}
                />
            )}

            {step == 2 && (
                <OtpForm
                    otp={otp}
                    setOtp={setOtp}
                    loading={loading}
                    setLoading={setLoading}
					error={error}
					setError={setError}
                    setStep={setStep}
                />
            )}

			{step == 3 && (
				<ChangePasswordForm
				password={password}
				setPassword={setPassword}
				loading={loading}
				setLoading={setLoading}
				error={error}
				setError={setError}
				email={email}
				/>
			)}
        </>
    );
};

export default ResetPassword;
