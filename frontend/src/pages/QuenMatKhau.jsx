import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../js/api";

const QuenMatKhau = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            alert("Vui lòng nhập email.");
            return;
        }
        try {
            setLoading(true);
            await api.post("/homestay/auth/forgot-password", {
                email
            });

            sessionStorage.setItem(
                "forgotEmail",
                email
            );

            alert("Mã OTP đã được gửi đến email của bạn.");
            navigate("/xac-thuc-otp");

        } catch (error) {
            alert(
                error.response?.data?.message || "Không tìm thấy email."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface-container-high font-body-md text-on-surface antialiased flex items-center justify-center min-h-screen">
            <main className="w-full max-w-[1280px] h-[900px] flex bg-surface-container-lowest shadow-xl overflow-hidden rounded-xl bg-white">
                {/* Left */}
                <section className="hidden lg:block w-7/12 relative h-full">
                    <div className="absolute inset-0 bg-primary/10 z-10"></div>
                    <img
                        alt="Homestay"
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4dWn0kFFyiC5H5Qsk8mD_kyQH_YO9Yq4qNZutzbt6ogy9ZOGVUOieoKPvDNwzZ4KBsUO1dtfgOzvXNihXcck_S5_0iins_ryTufFHW5bzX7MWNRr8ubm0nKVbTKGH1gXmipZfWunGdSkIzQULycxjlI_TeBQdWOxG067JvCJhNRszTPCpTAwIrCxnAoPeTVRqT6jnPe9DKY0ZzH--9MBfTI1Rs76u1msN4E0EAxbrv96_n7-cEECHqzpmtNYR5EWIsrbJL7UnOwI"
                    />
                    <div className="absolute top-10 left-10 z-20">
                        <span className="text-3xl font-bold text-white">
                            Luxestay
                        </span>
                    </div>
                    <div className="absolute bottom-10 left-10 z-20 max-w-md">
                        <h2 className="text-4xl text-white font-bold mb-4">
                            Khôi phục tài khoản của bạn
                        </h2>
                        <p className="text-white/90">
                            Chúng tôi sẽ gửi mã OTP đến email để giúp bạn đặt lại mật khẩu.
                        </p>
                    </div>
                </section>

                {/* Right */}
                <section className="w-full lg:w-5/12 bg-white flex flex-col px-8 md:px-16 lg:px-12">
                    <div className="w-full max-w-[440px] my-auto">
                        <div className="lg:hidden mb-10 flex justify-center">
                            <span className="text-3xl font-bold text-primary">
                                Luxestay
                            </span>
                        </div>
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold text-primary mb-3">
                                Quên mật khẩu
                            </h1>
                            <p className="text-gray-500">
                                Nhập email đã đăng ký để nhận mã OTP.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    className="block mb-2 text-gray-600"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="example@gmail.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
                            >
                                {
                                    loading ? "Đang gửi..." : "Gửi mã OTP"
                                }
                            </button>
                        </form>
                        <div className="mt-8 text-center">
                            <Link to="/dang-nhap"
                                className="text-blue-600 hover:underline"
                            >
                                ← Quay lại đăng nhập
                            </Link>
                        </div>
                    </div>
                    <div className="mt-auto py-8">
                        <p className="text-center text-gray-400 text-xs">
                            Luxestay Premium Service © 2026
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};
export default QuenMatKhau;