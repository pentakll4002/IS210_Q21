import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const orderId = `SS-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50/30 px-4">
      <div className="max-w-md w-full text-center">
        {/* Success animation */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl shadow-green-500/30">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
          Đặt Hàng Thành Công!
        </h1>
        <p className="mt-3 text-gray-500 text-lg">
          Cảm ơn bạn đã mua hàng. Đôi sneaker của bạn đang được chuẩn bị!
        </p>

        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4">
            <Package className="h-4 w-4" />
            <span>
              Mã Đơn Hàng:{" "}
              <span className="font-bold text-gray-900">{orderId}</span>
            </span>
          </div>
          <div className="h-px bg-gray-100 mb-4" />
          <div className="space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-500">Trạng Thái</span>
              <span className="text-green-600 font-semibold">Đang Xử Lý</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Thời Gian Giao Hàng</span>
              <span className="text-gray-900 font-medium">
                3-5 Ngày Làm Việc
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vận Chuyển</span>
              <span className="text-green-600 font-medium">Miễn Phí</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 group"
          >
            Tiếp Tục Mua Sắm{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/account"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            <Home className="h-4 w-4" /> Tài Khoản Của Tôi
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Một email xác nhận đã được gửi đến hộp thư của bạn.
        </p>
      </div>
    </div>
  );
}
