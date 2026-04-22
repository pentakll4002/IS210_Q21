import { useState, useEffect } from "react";
import { Zap, Truck, RefreshCw } from "lucide-react";

const announcements = [
  { icon: Zap, text: "⚡ FLASH SALE — GIẢM 30% HÀNG MỚI VỀ | MÃ: SNEAK30" },
  { icon: Truck, text: "🚚 MIỄN PHÍ GIAO HÀNG ĐƠN TỪ 3 TRIỆU — THỜI GIAN CÓ HẠN" },
  { icon: RefreshCw, text: "🔄 MIỄN PHÍ ĐỔI TRẢ 30 NGÀY — MUA SẮM KHÔNG RỦI RO" },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-purple-600/20" />
      <div className="container mx-auto px-4 py-2.5 relative">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
          <span
            key={currentIndex}
            className="slide-up inline-flex items-center gap-2"
          >
            {announcements[currentIndex].text}
          </span>
        </div>
      </div>
      {/* Animated dots indicator */}
      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
        {announcements.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-4 bg-orange-400" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
