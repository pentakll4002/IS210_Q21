import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import type { SanPham } from "@/services/products";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: SanPham;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, "US 9");
  };

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-black/8 hover:-translate-y-2 hover:border-gray-200 scale-in"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.hinhAnh || ""}
          alt={product.tenSP}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Tags */}
        {product.trangThai === "HETHANG" && (
          <Badge className="absolute top-3 left-3 bg-gray-900/90 text-white border-0 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-wider">
            HẾT HÀNG
          </Badge>
        )}
        {/* We can map HOT/MỚI tags based on category or date if needed, skipping for now */}
        {product.giaGoc && product.trangThai !== "HETHANG" && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 px-3 py-1 rounded-full text-[10px] tracking-wider font-bold">
            GIẢM GIÁ
          </Badge>
        )}
        
        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm z-10"
        >
          <Heart className={`h-4 w-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Quick add */}
        {product.trangThai !== "HETHANG" && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
            <Button onClick={handleAddToCart} className="w-full bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white rounded-xl h-11 text-sm font-semibold shadow-xl">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Thêm Vào Giỏ
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.15em]">{product.thuongHieu?.tenTH || "SNEAKER"}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-gray-700 transition-colors">
          {product.tenSP}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${product.gia}</span>
            {product.giaGoc && (
              <span className="text-sm text-gray-400 line-through">${product.giaGoc}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
