"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Star, ArrowRight, Zap, Check } from "lucide-react";
import type { WebsiteItem, WebsiteCategory } from "@/lib/store";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function FeaturedCard({
  website,
  category,
  reverse = false,
  index,
}: {
  website: WebsiteItem;
  category?: WebsiteCategory;
  reverse?: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-center`}
    >
      {/* Image with parallax */}
      <div className="relative w-full lg:w-1/2 overflow-hidden rounded-3xl">
        <div className="relative h-72 md:h-96 overflow-hidden rounded-3xl">
          <motion.img
            src={website.imageUrl}
            alt={website.title}
            style={{ y: imgY }}
            className="w-full h-[115%] object-cover -mt-[7.5%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />

          {/* Price badge */}
          <div className="absolute bottom-5 left-5">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
              className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3"
            >
              <div className="text-white/50 text-xs mb-0.5">Harga mulai dari</div>
              <div className="text-violet-400 font-black text-xl">
                {formatPrice(website.price)}
              </div>
            </motion.div>
          </div>

          {/* Glow border */}
          <div
            className={`absolute inset-0 rounded-3xl border-2 border-gradient ${
              category ? `bg-gradient-to-br ${category.color}` : ""
            } opacity-0`}
          />
        </div>

        {/* Decorative glow */}
        <div
          className={`absolute -inset-4 rounded-3xl ${
            category
              ? `bg-gradient-to-br ${category.color}`
              : "bg-gradient-to-br from-violet-600 to-cyan-600"
          } opacity-10 blur-2xl -z-10`}
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        {/* Category */}
        {category && (
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium mb-5`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </motion.div>
        )}

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          {website.title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-lg leading-relaxed mb-6">
          {website.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {website.techStack.map((tech) => (
            <div key={tech} className="flex items-center gap-2 text-white/70 text-sm">
              <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                <Check size={10} className="text-violet-400" />
              </div>
              {tech}
            </div>
          ))}
        </div>

        {/* Rating + Sold */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={
                  s <= Math.round(website.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/20"
                }
              />
            ))}
            <span className="text-white font-bold ml-1">{website.rating}</span>
          </div>
          <span className="text-white/30 text-sm">•</span>
          <span className="text-white/50 text-sm">{website.sold} kali terjual</span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
          >
            <Zap size={16} className="fill-white" />
            Dapatkan Sekarang
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
          <motion.a
            href={website.demoUrl || "#"}
            whileHover={{ scale: 1.04 }}
            className="px-6 py-3.5 rounded-2xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all"
          >
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  categories: WebsiteCategory[];
  websites: WebsiteItem[];
}

export default function FeaturedSection({ categories, websites }: Props) {
  const featuredWebsites = websites.filter((w) => w.featured).slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (featuredWebsites.length === 0) return null;

  return (
    <section
      id="featured"
      ref={ref}
      className="relative py-28 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-sm font-medium mb-5">
            <Zap size={12} className="fill-yellow-300" />
            Featured Picks
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
            Website{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Terpopuler
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Dipilih berdasarkan penjualan tertinggi dan ulasan terbaik dari klien kami
          </p>
        </motion.div>

        {/* Featured Cards */}
        <div className="flex flex-col gap-24">
          {featuredWebsites.map((website, i) => (
            <FeaturedCard
              key={website.id}
              website={website}
              category={categories.find((c) => c.id === website.categoryId)}
              reverse={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
