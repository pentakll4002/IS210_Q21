import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { HeroBanner } from "@/components/common/HeroBanner";
import { BrandMarquee } from "@/components/common/BrandMarquee";
import { FeaturedCategories } from "@/components/common/FeaturedCategories";
import { ProductSection } from "@/components/common/ProductSection";
import { Newsletter } from "@/components/common/Newsletter";
import { Footer } from "@/components/common/Footer";
import { products } from "@/data/products";

export const Route = createFileRoute("/")(  {
  component: Index,
});

function Index() {
  const newArrivals = products.filter((p) => p.category === "hang-moi-ve");
  const bestSellers = products.filter((p) => p.category === "ban-chay");
  const sneakers = products.filter((p) => p.category === "sneaker");
  const apparel = products.filter((p) => p.category === "quan-ao");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <BrandMarquee />
        <ProductSection id="hang-moi-ve" title="Hàng Mới Về" products={newArrivals} />
        <FeaturedCategories />
        <ProductSection id="ban-chay" title="Bán Chạy Nhất" products={bestSellers} />
        <ProductSection id="sneaker" title="Giày Sneaker" products={sneakers} />
        <ProductSection id="quan-ao" title="Quần Áo & Streetwear" products={apparel} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
