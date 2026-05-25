import { Separator } from "@/components/common/Separator";
import { Instagram, Twitter, Youtube, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-white">
              SNEAK<span className="text-gradient">SURF</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Điểm đến của bạn cho những đôi sneaker, trang phục đường phố &
              hàng độc quyền mới nhất từ các thương hiệu hàng đầu thế giới.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Twitter, Youtube, Music2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Mua Sắm
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Hàng Mới Về",
                "Bán Chạy Nhất",
                "Giày Sneaker",
                "Quần Áo",
                "Phụ Kiện",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Thông Tin Vận Chuyển",
                "Đổi & Trả Hàng",
                "Hướng Dẫn Chọn Size",
                "Câu Hỏi Thường Gặp",
                "Liên Hệ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Công Ty
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Về Chúng Tôi",
                "Tuyển Dụng",
                "Blog",
                "Báo Chí",
                "Phát Triển Bền Vững",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-white/5" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-600 md:flex-row">
          <p>&copy; 2025 SNEAKSURF. Bản quyền đã được bảo hộ.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Chính Sách Bảo Mật
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Điều Khoản Dịch Vụ
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Cài Đặt Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
