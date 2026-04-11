"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  ExternalLink,
  ShoppingCart,
  Eye,
  Zap,
  ChevronRight,
} from "lucide-react";
import type { WebsiteCategory, WebsiteItem } from "@/lib/store";

interface Props {
  categories: WebsiteCategory[];
  websites: WebsiteItem[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function WebsiteCard({
  website,
  category,
  index,
}: {
  website: WebsiteItem;
  category?: WebsiteCategory;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer"
    >
      {/* Featured badge */}
      {website.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold shadow-lg">
          <Zap size={10} className="fill-white" />
          FEATURED
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <motion.img
          src={website.imageUrl}
          alt={website.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Overlay actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
            >
              <motion.a
                href={website.demoUrl || "#"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={14} />
                Preview
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category badge */}
        {category && (
          <div className="absolute bottom-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${category.color}`}
            >
              {category.icon} {category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-violet-300 transition-colors">
            {website.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 shrink-0 ml-2">
            <Star size={12} className="fill-yellow-400" />
            <span className="text-xs font-semibold">{website.rating}</span>
          </div>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
          {website.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {website.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/50 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-violet-400 font-black text-xl">
              {formatPrice(website.price)}
            </div>
            <div className="text-white/30 text-xs mt-0.5">
              {website.sold} terjual
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-bold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow duration-300"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ShoppingCart size={14} />
            Beli
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CatalogSection({ categories, websites }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "all"
      ? websites
      : websites.filter((w) => w.categoryId === activeCategory);

  return (
    <section
      id="catalog"
      ref={ref}
      className="relative py-28 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-sm font-medium mb-5">
            Katalog Lengkap
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
            Temukan Website{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Impian Anda
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Koleksi website berkualitas tinggi yang siap pakai. Semua dibuat
            dengan teknologi terbaru dan best practices.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === "all"
                ? "text-white bg-gradient-to-r from-violet-600 to-cyan-600 shadow-lg shadow-violet-500/30"
                : "text-white/50 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🌐</span>
            Semua
            <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-xs">
              {websites.length}
            </span>
          </button>

          {categories.map((cat) => {
            const count = websites.filter((w) => w.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
                  activeCategory === cat.id
                    ? "text-white shadow-lg"
                    : "text-white/50 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="category-active"
                    className={`absolute inset-0 bg-gradient-to-r ${cat.color}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{cat.icon}</span>
                <span className="relative">{cat.name}</span>
                <span className="relative px-1.5 py-0.5 rounded-md bg-white/20 text-xs">
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((website, i) => (
              <WebsiteCard
                key={website.id}
                website={website}
                category={categories.find((c) => c.id === website.categoryId)}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-white/30"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Belum ada website di kategori ini</p>
          </motion.div>
        )}

        {/* View more hint */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors text-sm"
            >
              Butuh sesuatu yang custom?{" "}
              <ChevronRight size={16} className="animate-pulse" />
              Hubungi kami
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
