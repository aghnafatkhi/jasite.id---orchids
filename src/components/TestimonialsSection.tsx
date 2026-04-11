"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/store";

interface Props {
  testimonials: Testimonial[];
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative group p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden"
    >
      {/* Quote icon */}
      <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={48} className="text-violet-400" />
      </div>

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/5 group-hover:to-cyan-600/5 transition-all duration-500" />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={
              s <= testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-white/20"
            }
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-white/70 text-base leading-relaxed mb-6 relative">
        &ldquo;{testimonial.message}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-11 h-11 rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-white/40 text-xs">
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection({ testimonials }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Marquee rows
  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

  // Mobile slider state
  const [current, setCurrent] = useState(0);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative py-28 bg-black overflow-hidden"
    >
      {/* Parallax background orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-32 top-20 w-96 h-96 rounded-full bg-violet-700/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-32 bottom-20 w-[500px] h-[500px] rounded-full bg-cyan-700/10 blur-[150px] pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-sm font-medium mb-5">
            <Star size={12} className="fill-yellow-300" />
            100% Real Reviews
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
            Kata Mereka{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Tentang Kami
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Lebih dari 265 klien telah mempercayakan kebutuhan website mereka kepada kami
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </motion.div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard
                testimonial={testimonials[current]}
                index={0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() =>
                setCurrent((c) =>
                  c === 0 ? testimonials.length - 1 : c - 1
                )
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-white/40 text-sm">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={() =>
                setCurrent((c) =>
                  c === testimonials.length - 1 ? 0 : c + 1
                )
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-8 rounded-3xl bg-white/5 border border-white/10"
        >
          <div className="text-center sm:text-left">
            <div className="text-6xl font-black text-white">4.9</div>
            <div className="flex gap-1 mt-1 justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-white/50 text-sm mb-3">Rating dari</div>
            <div className="text-white font-bold text-xl">265+ ulasan terverifikasi</div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-white/50 text-sm mb-1">Direkomendasikan oleh</div>
            <div className="text-white font-black text-3xl">98%</div>
            <div className="text-white/40 text-sm">dari klien kami</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
