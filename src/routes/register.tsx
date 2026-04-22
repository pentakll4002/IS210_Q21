import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) { navigate({ to: "/" }); return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Vui lòng điền đầy đủ thông tin"); return; }
    if (password.length < 6) { setError("Mật khẩu phải chứa ít nhất 6 ký tự"); return; }
    const ok = register(name, email, password);
    if (ok) navigate({ to: "/" }); else setError("Email đã tồn tại");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&h=1600&fit=crop" alt="Sneakers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <Link to="/" className="font-display text-3xl font-bold text-white">SNEAK<span className="text-gradient">SURF</span></Link>
          <p className="mt-4 text-lg text-white/70 max-w-md">Tham gia cùng 50,000+ sneakerhead. Nhận thông báo sớm về những đợt ra mắt giới hạn.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden font-display text-2xl font-bold text-gray-900 mb-8 block">SNEAK<span className="text-gradient">SURF</span></Link>
          <h1 className="font-display text-3xl font-bold text-gray-900">Tạo tài khoản</h1>
          <p className="mt-2 text-gray-500">Gia nhập cộng đồng sneaker ngay hôm nay</p>

          {error && <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Họ Tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@example.com"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mật Khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tối thiểu 6 ký tự"
                  className="w-full h-12 pl-11 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-500 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 accent-gray-900 mt-0.5" />
              Tôi đồng ý với <a href="#" className="text-gray-900 font-medium underline">Điều Khoản Dịch Vụ</a> và <a href="#" className="text-gray-900 font-medium underline">Chính Sách Bảo Mật</a>
            </label>
            <button type="submit" className="w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 group">
              Tạo Tài Khoản <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Đã có tài khoản? <Link to="/login" className="font-semibold text-gray-900 hover:text-orange-500 transition-colors">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
