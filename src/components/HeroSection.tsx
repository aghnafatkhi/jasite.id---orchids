"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Globe } from "lucide-react";

const FloatingCard = ({
  delay,
  x,
  y,
  children,
}: {
  delay: number;
  x: string;
  y: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{ left: x, top: y }}
    className="absolute hidden lg:block"
  >
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl"
    >
      {children}
    </motion.div>
  </motion.div>
);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  const springY1 = useSpring(y1, { stiffness: 80, damping: 20 });
  const springY2 = useSpring(y2, { stiffness: 60, damping: 20 });

  const scrollToCatalog = () => {
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* ── Parallax Background Layers ── */}
      <motion.div
        style={{ y: springY1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-black to-black" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Mid layer orbs */}
      <motion.div
        style={{ y: springY2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-700/10 blur-[180px]" />
      </motion.div>

      {/* Particle dots */}
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 53 + 10) % 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* ── Floating Cards ── */}
      <FloatingCard delay={1.2} x="8%" y="20%">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center">
            <TrendingUp size={14} className="text-green-400" />
          </div>
          <div>
            <p className="text-xs text-white/50">Konversi Rate</p>
            <p className="text-sm font-bold">+312%</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={1.4} x="78%" y="15%">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-white/50">Rating Rata-rata</p>
            <p className="text-sm font-bold">4.9 / 5.0</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={1.6} x="82%" y="65%">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Globe size={14} className="text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-white/50">Website Terjual</p>
            <p className="text-sm font-bold">265+ Klien</p>
          </div>
        </div>
      </FloatingCard>

      {/* ── Main Content ── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center pt-28"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Website Premium Siap Pakai
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight"
          >
            Website yang
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
          >
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Mengubah Bisnis
            </span>
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight"
          >
            Anda
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Koleksi website premium yang dirancang untuk mengkonversi pengunjung
          menjadi pelanggan. Kode bersih, desain modern, performa tinggi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToCatalog}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Lihat Katalog</span>
            <ArrowRight
              size={20}
              className="relative group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>

          <motion.button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Konsultasi Gratis
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm"
        >
          {["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Ready"].map(
            (tech, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-violet-500" />
                <span>{tech}</span>
              </div>
            )
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
