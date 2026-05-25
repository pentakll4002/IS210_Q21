export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: "hang-moi-ve" | "ban-chay" | "sneaker" | "quan-ao";
  soldOut?: boolean;
  tag?: string;
  rating?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Jordan 1 Retro High OG 'Chicago Lost & Found'",
    price: 259,
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop",
    brand: "Jordan",
    category: "hang-moi-ve",
    tag: "HOT",
    rating: 4.9,
  },
  {
    id: 2,
    name: "adidas Originals Samba OG 'White Green Gum'",
    price: 159,
    originalPrice: 189,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d6306a5933?w=600&h=600&fit=crop",
    brand: "adidas Originals",
    category: "hang-moi-ve",
    rating: 4.8,
  },
  {
    id: 3,
    name: "New Balance 550 'White Grey'",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
    brand: "New Balance",
    category: "hang-moi-ve",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Nike Dunk Low 'Panda' Black White",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop",
    brand: "Nike",
    category: "hang-moi-ve",
    tag: "MỚI",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Nike Air Max 90 'Infrared' 2024",
    price: 229,
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop",
    brand: "Nike",
    category: "ban-chay",
    tag: "BEST",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Asics GEL-KAYANO 14 'White Midnight'",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1600185365926-3e5931e4e271?w=600&h=600&fit=crop",
    brand: "Asics",
    category: "ban-chay",
    rating: 4.7,
  },
  {
    id: 7,
    name: "adidas Yeezy Boost 350 V2 'Zebra'",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=600&fit=crop",
    brand: "adidas",
    category: "ban-chay",
    tag: "GIỚI HẠN",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Nike Air Force 1 '07 'Triple White'",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d502d2e28?w=600&h=600&fit=crop",
    brand: "Nike",
    category: "ban-chay",
    rating: 4.9,
  },
  {
    id: 9,
    name: "Jordan 4 Retro 'Military Black'",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&h=600&fit=crop",
    brand: "Jordan",
    category: "sneaker",
    tag: "THỊNH HÀNH",
    rating: 4.8,
  },
  {
    id: 10,
    name: "Salomon XT-6 'Black Phantom'",
    price: 269,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop",
    brand: "Salomon",
    category: "sneaker",
    rating: 4.6,
  },
  {
    id: 11,
    name: "ON Cloudtilt 'Eclipse Black'",
    price: 189,
    originalPrice: 229,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264fd278?w=600&h=600&fit=crop",
    brand: "ON Cloud",
    category: "sneaker",
    rating: 4.5,
  },
  {
    id: 12,
    name: "Converse Chuck 70 High 'Parchment'",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&h=600&fit=crop",
    brand: "Converse",
    category: "sneaker",
    rating: 4.7,
  },
  {
    id: 13,
    name: "Nike Tech Fleece Joggers 'Dark Heather'",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c42c?w=600&h=600&fit=crop",
    brand: "Nike",
    category: "quan-ao",
    rating: 4.6,
  },
  {
    id: 14,
    name: "Stüssy Basic Tee 'Black'",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf9ab1?w=600&h=600&fit=crop",
    brand: "Stüssy",
    category: "quan-ao",
    rating: 4.5,
  },
  {
    id: 15,
    name: "Fear of God Essentials Hoodie 'Oatmeal'",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1578768079470-0a4536cc5e21?w=600&h=600&fit=crop",
    brand: "Fear Of God Essentials",
    category: "quan-ao",
    tag: "HOT",
    rating: 4.8,
  },
  {
    id: 16,
    name: "Carhartt WIP Detroit Jacket 'Hamilton Brown'",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    brand: "Carhartt",
    category: "quan-ao",
    rating: 4.7,
  },
];

export const brands = [
  "Nike",
  "Jordan",
  "adidas Originals",
  "New Balance",
  "Asics",
  "Salomon",
  "ON Cloud",
  "Converse",
  "Stüssy",
  "Fear Of God Essentials",
  "Carhartt",
  "PUMA",
];

export const navCategories = [
  { label: "Hàng Mới Về", href: "/#hang-moi-ve" },
  { label: "Bán Chạy", href: "/#ban-chay" },
  {
    label: "Nam",
    href: "/#sneaker",
    subcategories: ["Sneaker", "Quần Áo", "Túi & Phụ Kiện"],
  },
  {
    label: "Nữ",
    href: "/#sneaker",
    subcategories: ["Sneaker", "Quần Áo", "Túi & Phụ Kiện"],
  },
  { label: "Trẻ Em", href: "#" },
  { label: "Thương Hiệu", href: "#", subcategories: brands },
];
