import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X, Heart } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/common/Sheet";
import { Input } from "@/components/common/Input";
import { navCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/50" : "bg-white border-b border-gray-100"}`}>
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-800 hover:bg-gray-100 rounded-full"><Menu className="h-5 w-5" /><span className="sr-only">Mở menu</span></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[320px] sm:w-[380px] bg-white border-r-0">
            <div className="mt-8 mb-6">
              <Link to="/" className="font-display text-2xl font-bold tracking-tight text-gray-900">SNEAK<span className="text-gradient">SURF</span></Link>
            </div>
            <nav className="flex flex-col gap-1">
              <Link to="/products" className="text-base font-medium text-gray-700 px-4 py-3 rounded-xl transition-all hover:bg-gray-100 hover:text-gray-900">Tất Cả Sản Phẩm</Link>
              {navCategories.map((cat) => (
                <Link key={cat.label} to={cat.href} className="text-base font-medium text-gray-700 px-4 py-3 rounded-xl transition-all hover:bg-gray-100 hover:text-gray-900">{cat.label}</Link>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
              {isAuthenticated ? (
                <Link to="/account" className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white rounded-full h-12 leading-[48px] font-semibold">Tài Khoản Của Tôi</Link>
              ) : (
                <><Link to="/login" className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white rounded-full h-12 leading-[48px] font-semibold">Đăng Nhập</Link>
                <Link to="/register" className="block w-full text-center border-2 border-gray-200 text-gray-700 rounded-full h-12 leading-[48px] font-semibold hover:bg-gray-50">Tạo Tài Khoản</Link></>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity">SNEAK<span className="text-gradient">SURF</span></Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link to="/products" className="px-4 py-2 rounded-full text-gray-600 transition-all duration-300 hover:text-gray-900 hover:bg-gray-100">Tất Cả Sản Phẩm</Link>
          {navCategories.slice(0, 4).map((cat) => (
            <Link key={cat.label} to={cat.href} className="px-4 py-2 rounded-full text-gray-600 transition-all duration-300 hover:text-gray-900 hover:bg-gray-100">{cat.label}</Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {searchOpen ? (
            <div className="flex items-center gap-2 slide-up">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Tìm kiếm giày..." className="w-[220px] h-10 pl-10 pr-4 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 transition-all" autoFocus />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"><X className="h-4 w-4" /></Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900"><Search className="h-5 w-5" /><span className="sr-only">Tìm kiếm</span></Button>
          )}
          <Link to={isAuthenticated ? "/account" : "/login"}>
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900"><User className="h-5 w-5" /><span className="sr-only">Tài Khoản</span></Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center">{totalItems}</span>}
              <span className="sr-only">Giỏ Hàng</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
