import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Send, Sparkles } from "lucide-react";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-purple-600/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)',backgroundSize:'32px 32px'}} />
      
      <div className="container mx-auto px-4 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-orange-400" />
          Đừng bỏ lỡ bất kỳ đợt phát hành nào
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
          Gia Nhập <span className="text-gradient">Sneaker Club</span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
          Là người đầu tiên nhận thông báo về mẫu mới, ưu đãi độc quyền và tin tức sneaker nội bộ.
        </p>
        <form className="mt-8 flex max-w-md mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            placeholder="Nhập email của bạn"
            className="flex-1 h-14 rounded-full bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/15 focus:border-orange-500/50 backdrop-blur-sm px-6"
          />
          <Button
            type="submit"
            className="h-14 px-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 whitespace-nowrap"
          >
            <Send className="h-4 w-4 mr-2" />
            Đăng Ký
          </Button>
        </form>
        <p className="mt-4 text-xs text-gray-500">Không spam, có thể hủy bất cứ lúc nào. Tham gia cùng 50,000+ sneakerhead.</p>
      </div>
    </section>
  );
}
