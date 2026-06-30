import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../js/api";

const NhapOtpQuenMatKhau = () => {

    const navigate = useNavigate();
    const email = sessionStorage.getItem("forgotEmail");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate("/quen-mat-khau");
        }
    }, [email, navigate]);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("OTP phải gồm 6 chữ số.");
            return;
        }

        try {
            setLoading(true);
            await api.post("/homestay/auth/verify-forgot-password", {
                email,
                otp
            });
            alert("Xác thực OTP thành công.");
            navigate("/dat-lai-mat-khau");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "OTP không đúng hoặc đã hết hạn."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {await api.post("/homestay/auth/resend-pin", {
                email
            });
            alert("Đã gửi lại mã OTP.");
            setCountdown(60);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Không thể gửi lại OTP."
            );
        }
    };

    return (
        <div className="bg-surface-container-high flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-3">
                    Xác thực OTP
                </h2>
                <p className="text-center text-gray-500">
                    Chúng tôi đã gửi mã OTP đến
                </p>
                <p className="text-center font-semibold mt-2 mb-8">
                    {email}
                </p>
                <form onSubmit={handleVerify}>
                    <label className="block mb-2">
                        Nhập mã OTP
                    </label>
                    <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, "")
                            )
                        }
                        placeholder="123456"
                        className="w-full border rounded-lg px-4 py-3 text-center text-3xl tracking-[10px]"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
                    >
                        {
                            loading ? "Đang xác thực..." : "Xác nhận"
                        }
                    </button>
                </form>

                <div className="text-center mt-8">
                    {countdown > 0 ?
                            <p className="text-gray-500">
                                Gửi lại OTP sau
                                <span className="font-bold text-primary">
                                    {" "}
                                    {countdown}
                                    s
                                </span>
                            </p>
                            :
                            <button
                                onClick={handleResendOtp}
                                className="text-primary hover:underline"
                            >
                                Gửi lại mã OTP
                            </button>
                    }
                </div>
                <div className="text-center mt-6">
                    <Link to="/quen-mat-khau"
                        className="text-gray-500 hover:underline"
                    >
                        ← Quay lại
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NhapOtpQuenMatKhau;