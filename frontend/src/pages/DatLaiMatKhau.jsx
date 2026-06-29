import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../js/api";

const DatLaiMatKhau = () => {

    const navigate = useNavigate();
    const email = sessionStorage.getItem("forgotEmail");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email) {navigate("/quen-mat-khau");}
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (password.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp.");
            return;

        }

        try {
            setLoading(true);
            await api.post("/homestay/auth/reset-password", {
                email,
                newPassword: password
            });

            sessionStorage.removeItem("forgotEmail");
            alert("Đổi mật khẩu thành công!");
            navigate("/dang-nhap");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Không thể đổi mật khẩu."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface-container-high flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-3">
                    Đặt lại mật khẩu
                </h2>
                <p className="text-center text-gray-500 mb-2">
                    Tài khoản
                </p>
                <p className="text-center font-semibold mb-8">
                    {email}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Nhập mật khẩu mới"
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2">
                            Xác nhận mật khẩu
                        </label>
                        <input type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Nhập lại mật khẩu"
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
                    >
                        {
                            loading ? "Đang cập nhật..." : "Đổi mật khẩu"
                        }
                    </button>
                </form>
                <div className="text-center mt-6">
                    <Link to="/dang-nhap"
                        className="text-gray-500 hover:underline"
                    >
                        ← Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DatLaiMatKhau;