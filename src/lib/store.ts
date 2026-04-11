"use client";

export interface WebsiteCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
}

export interface WebsiteItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  price: number;
  previewUrl?: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  techStack: string[];
  demoUrl?: string;
  rating: number;
  sold: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  message: string;
  rating: number;
}

// ─── Default Categories ──────────────────────────────────────────────────────
export const defaultCategories: WebsiteCategory[] = [
  {
    id: "1",
    name: "E-Commerce",
    slug: "ecommerce",
    icon: "🛒",
    color: "from-violet-600 to-purple-700",
    description: "Toko online modern & konversi tinggi",
  },
  {
    id: "2",
    name: "Company Profile",
    slug: "company",
    icon: "🏢",
    color: "from-blue-600 to-cyan-700",
    description: "Tampilkan profesionalisme bisnis Anda",
  },
  {
    id: "3",
    name: "Landing Page",
    slug: "landing",
    icon: "🚀",
    color: "from-orange-500 to-rose-600",
    description: "Halaman pendaratan yang memikat",
  },
  {
    id: "4",
    name: "Portfolio",
    slug: "portfolio",
    icon: "🎨",
    color: "from-emerald-500 to-teal-600",
    description: "Showcase karya terbaik Anda",
  },
  {
    id: "5",
    name: "Blog & News",
    slug: "blog",
    icon: "📰",
    color: "from-pink-500 to-rose-600",
    description: "Platform konten profesional",
  },
  {
    id: "6",
    name: "SaaS Dashboard",
    slug: "saas",
    icon: "📊",
    color: "from-indigo-600 to-blue-700",
    description: "Aplikasi web skala enterprise",
  },
];

// ─── Default Websites ─────────────────────────────────────────────────────────
export const defaultWebsites: WebsiteItem[] = [
  {
    id: "w1",
    title: "LuxeShop Pro",
    description:
      "Platform e-commerce premium dengan UI/UX modern, sistem keranjang canggih, payment gateway terintegrasi, dan dashboard admin lengkap.",
    categoryId: "1",
    price: 4500000,
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["Next.js", "Stripe", "Prisma", "Full-stack"],
    featured: true,
    techStack: ["Next.js 14", "TypeScript", "PostgreSQL", "Stripe", "Tailwind"],
    demoUrl: "#",
    rating: 4.9,
    sold: 47,
  },
  {
    id: "w2",
    title: "CorpVision",
    description:
      "Company profile minimalis dan elegan untuk perusahaan modern. Dilengkapi animasi halus, multi-language support, dan SEO-ready.",
    categoryId: "2",
    price: 2800000,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tags: ["React", "SEO", "Animation", "Multi-lang"],
    featured: true,
    techStack: ["Next.js", "Framer Motion", "i18n", "Tailwind"],
    demoUrl: "#",
    rating: 4.8,
    sold: 32,
  },
  {
    id: "w3",
    title: "ConvertX",
    description:
      "Landing page konversi tinggi dengan A/B testing built-in, heat map analytics, dan optimasi CRO profesional.",
    categoryId: "3",
    price: 1800000,
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["High-Convert", "Analytics", "CRO", "Speed"],
    featured: false,
    techStack: ["Next.js", "Analytics", "Tailwind", "Vercel"],
    demoUrl: "#",
    rating: 4.7,
    sold: 89,
  },
  {
    id: "w4",
    title: "ArtisanFolio",
    description:
      "Portfolio kreatif untuk desainer, fotografer, dan seniman digital. Galeri interaktif dengan lightbox dan filter kategori.",
    categoryId: "4",
    price: 1500000,
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    tags: ["Creative", "Gallery", "Lightbox", "Filter"],
    featured: true,
    techStack: ["Next.js", "GSAP", "Framer Motion", "Cloudinary"],
    demoUrl: "#",
    rating: 5.0,
    sold: 24,
  },
  {
    id: "w5",
    title: "NewsFlow",
    description:
      "Platform blog & berita modern dengan sistem CMS terintegrasi, komentar real-time, dan monetisasi iklan.",
    categoryId: "5",
    price: 3200000,
    imageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    tags: ["CMS", "Real-time", "Monetize", "SEO"],
    featured: false,
    techStack: ["Next.js", "Sanity CMS", "Socket.io", "Tailwind"],
    demoUrl: "#",
    rating: 4.6,
    sold: 18,
  },
  {
    id: "w6",
    title: "SaaSMetrics",
    description:
      "Dashboard SaaS enterprise-grade dengan visualisasi data real-time, multi-tenant support, dan sistem billing otomatis.",
    categoryId: "6",
    price: 8500000,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Enterprise", "Real-time", "Multi-tenant", "Billing"],
    featured: true,
    techStack: ["Next.js", "Recharts", "Prisma", "Stripe", "Redis"],
    demoUrl: "#",
    rating: 4.9,
    sold: 11,
  },
  {
    id: "w7",
    title: "FoodieCart",
    description:
      "Aplikasi pemesanan makanan online dengan sistem antrian dapur real-time, GPS tracking, dan notifikasi push.",
    categoryId: "1",
    price: 5500000,
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    tags: ["Food-Tech", "GPS", "Real-time", "PWA"],
    featured: false,
    techStack: ["Next.js", "Socket.io", "Maps API", "Firebase"],
    demoUrl: "#",
    rating: 4.8,
    sold: 29,
  },
  {
    id: "w8",
    title: "AgencyElite",
    description:
      "Company profile agency kreatif dengan animasi scroll sinematik, showcase portfolio interaktif, dan form inquiry cerdas.",
    categoryId: "2",
    price: 3800000,
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    tags: ["Creative Agency", "Cinematic", "Interactive", "Premium"],
    featured: false,
    techStack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    demoUrl: "#",
    rating: 4.9,
    sold: 15,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Budi Santoso",
    role: "CEO",
    company: "PT. Maju Bersama",
    avatar: "https://i.pravatar.cc/150?img=11",
    message:
      "Website yang dibeli melebihi ekspektasi. Kualitas kode sangat bersih, performa luar biasa, dan support-nya responsif banget. Highly recommended!",
    rating: 5,
  },
  {
    id: "t2",
    name: "Siti Rahayu",
    role: "Founder",
    company: "Warung Digital",
    avatar: "https://i.pravatar.cc/150?img=25",
    message:
      "Toko online saya langsung naikkan penjualan 3x lipat setelah pakai template ini. Desainnya profesional dan mudah dikustomisasi.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Ahmad Rizki",
    role: "Marketing Director",
    company: "StartupHub ID",
    avatar: "https://i.pravatar.cc/150?img=33",
    message:
      "Landing page-nya konversi banget! Dalam seminggu conversion rate kami naik dari 2% ke 8.5%. Worth every penny.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Maya Putri",
    role: "Creative Director",
    company: "Kreasi Studio",
    avatar: "https://i.pravatar.cc/150?img=47",
    message:
      "Portfolio saya akhirnya terlihat seprofesional karya saya. Klien baru langsung kagum saat pertama kali lihat website.",
    rating: 5,
  },
];

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────
const CATEGORIES_KEY = "ws_categories";
const WEBSITES_KEY = "ws_websites";

export function getCategories(): WebsiteCategory[] {
  if (typeof window === "undefined") return defaultCategories;
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : defaultCategories;
}

export function saveCategories(cats: WebsiteCategory[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
}

export function getWebsites(): WebsiteItem[] {
  if (typeof window === "undefined") return defaultWebsites;
  const stored = localStorage.getItem(WEBSITES_KEY);
  return stored ? JSON.parse(stored) : defaultWebsites;
}

export function saveWebsites(sites: WebsiteItem[]): void {
  localStorage.setItem(WEBSITES_KEY, JSON.stringify(sites));
}
