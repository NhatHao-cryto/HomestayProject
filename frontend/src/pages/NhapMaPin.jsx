import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../js/api";

const NhapMaPin = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const email = sessionStorage.getItem("verifyEmail");

    useEffect(() => {
        if (!email) {
            navigate("/dang-ky");
        }
    }, [email, navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("OTP phải gồm 6 chữ số.");
            return;
        }

        try {
            await api.post("/homestay/auth/verify-pin", {
                email,
                otp
            });
            sessionStorage.removeItem("verifyEmail");
            alert("Đăng ký thành công!");
            navigate("/dang-nhap");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "OTP không đúng hoặc đã hết hạn."
            );
        }
    };

    const handleResendOtp = async () => {
        try {
            await api.post("/homestay/auth/resend-pin", {
                email
            });
            alert("Đã gửi lại mã OTP.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Không thể gửi lại OTP."
            );
        }
    };

    return (
        <div className="bg-surface flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-2">
                    Xác thực Email
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Mã xác thực đã được gửi đến
                </p>
                <p className="text-center font-semibold mb-8">
                    {email}
                </p>

                <form onSubmit={handleVerify}>
                    <div className="mb-6">
                        <label className="block mb-2">
                            Mã OTP
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Nhập 6 số OTP"
                            className="w-full border rounded-lg px-4 py-3 text-center text-2xl tracking-[10px]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
                    >
                        Xác nhận
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button
                        onClick={handleResendOtp}
                        className="text-primary hover:underline"
                    >
                        Gửi lại mã OTP
                    </button>
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/dang-ky")}
                        className="text-gray-500 hover:underline"
                    >
                        Quay lại đăng ký
                    </button>
                </div>
            </div>
        </div>
    );

};

export default NhapMaPin;