import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  // OTP Verification Step States
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes
  const [resending, setResending] = useState(false);
  const [sendingCaptcha, setSendingCaptcha] = useState(false);
  const [tosChecked, setTosChecked] = useState(false);

  useEffect(() => {
    if (!showOtpStep || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showOtpStep, timer]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  const handleSendCaptcha = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự");
      return;
    }
    if (!tosChecked) {
      setError("Bạn cần đồng ý với Điều Khoản Dịch Vụ và Chính Sách Bảo Mật");
      return;
    }

    setSendingCaptcha(true);
    try {
      await authService.sendCaptcha(email);
      setShowOtpStep(true);
      setTimer(300);
    } catch (err: any) {
      setError(
        err.response?.data?.thongBao ||
          "Không thể gửi email xác thực. Vui lòng kiểm tra lại địa chỉ email hoặc thử lại sau."
      );
    } finally {
      setSendingCaptcha(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otpCode || otpCode.trim().length !== 6) {
      setError("Vui lòng nhập đúng mã xác thực gồm 6 chữ số");
      return;
    }

    const ok = await register(name, email, password, otpCode.trim());
    if (ok) {
      navigate({ to: "/" });
    } else {
      setError("Mã xác thực không chính xác hoặc đã hết hạn");
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await authService.sendCaptcha(email);
      setTimer(300);
      setOtpCode("");
    } catch (err: any) {
      setError(err.response?.data?.thongBao || "Không thể gửi lại mã xác thực");
    } finally {
      setResending(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* Visual Side Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=1600&fit=crop"
          alt="Sneakers Design"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <Link to="/" className="font-display text-3xl font-bold text-white">
            SNEAK<span className="text-gradient">SURF</span>
          </Link>
          <p className="mt-4 text-lg text-white/80 max-w-md">
            Khám phá trọn bộ các dòng sneaker giới hạn cùng trải nghiệm mua sắm bảo mật, chuyên nghiệp tuyệt đối.
          </p>
        </div>
      </div>

      {/* Auth Form Container */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo on Mobile */}
          <Link
            to="/"
            className="lg:hidden font-display text-2xl font-bold text-gray-900 mb-8 block"
          >
            SNEAK<span className="text-gradient">SURF</span>
          </Link>

          {!showOtpStep ? (
            // Step 1: Account Information form
            <>
              <h1 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
                Tạo tài khoản mới
              </h1>
              <p className="mt-2 text-gray-500">
                Gia nhập cộng đồng Sneaksurf ngay hôm nay
              </p>

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSendCaptcha} className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ Và Tên
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email đăng ký
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="bạn@example.com"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mật Khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full h-12 pl-11 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPw ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    id="tos"
                    checked={tosChecked}
                    onChange={(e) => setTosChecked(e.target.checked)}
                    className="mt-1 rounded border-gray-300 accent-gray-900 cursor-pointer"
                  />
                  <label htmlFor="tos" className="cursor-pointer select-none">
                    Tôi đồng ý với{" "}
                    <a href="#" className="font-semibold text-gray-900 hover:underline">
                      Điều Khoản Dịch Vụ
                    </a>{" "}
                    và{" "}
                    <a href="#" className="font-semibold text-gray-900 hover:underline">
                      Chính Sách Bảo Mật
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sendingCaptcha}
                  className="w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {sendingCaptcha ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi mã OTP...
                    </>
                  ) : (
                    <>
                      Tiếp Tục Đăng Ký{" "}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            // Step 2: OTP / Captcha verification form
            <>
              <button
                type="button"
                onClick={() => {
                  setShowOtpStep(false);
                  setError("");
                }}
                className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" /> Thay đổi thông tin đăng ký
              </button>

              <h1 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
                Xác thực email
              </h1>
              <p className="mt-2 text-gray-500 text-sm">
                Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến địa chỉ email{" "}
                <b className="text-gray-800">{email}</b>
              </p>

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyAndRegister} className="mt-8 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Mã Xác Thực (OTP)
                    </label>
                    <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100 flex items-center gap-1">
                      <KeyRound className="h-3 w-3" /> Hiệu lực: {formatTime(timer)}
                    </span>
                  </div>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="Nhập 6 chữ số"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm tracking-[0.25em] font-mono text-center font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Chưa nhận được mã?</span>
                  <button
                    type="button"
                    disabled={timer > 0 || resending}
                    onClick={handleResend}
                    className="font-bold text-gray-900 hover:text-orange-500 transition-colors disabled:opacity-40 disabled:hover:text-gray-500"
                  >
                    {resending ? "Đang gửi..." : "Gửi lại mã ngay"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Đang hoàn tất đăng ký...
                    </>
                  ) : (
                    <>
                      Hoàn Tất Đăng Ký{" "}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="mt-8 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-semibold text-gray-900 hover:text-orange-500 transition-colors"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
