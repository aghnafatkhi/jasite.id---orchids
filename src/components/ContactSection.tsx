"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  Instagram,
  Twitter,
  Github,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-28 bg-black overflow-hidden"
    >
      {/* Parallax BG */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/30 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-800/10 blur-[200px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139,92,246,0.2) 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Big CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center mb-20 py-20 px-8 rounded-[2.5rem] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-purple-900/40 to-cyan-900/30 rounded-[2.5rem]" />
          <div className="absolute inset-0 border border-white/10 rounded-[2.5rem]" />

          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-10 rounded-[2.5rem] overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/50"
              style={{
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-6"
            >
              <Zap size={12} className="fill-violet-300" />
              Mulai Sekarang, Gratis Konsultasi
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Siap Membawa Bisnis{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Ke Level Berikutnya?
              </span>
            </h2>

            <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto">
              Dapatkan website impian Anda dengan kualitas premium. Konsultasi gratis,
              proses cepat, hasil luar biasa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://wa.me/62812345678"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-bold text-lg shadow-2xl shadow-green-500/40 transition-all"
              >
                <MessageCircle size={20} />
                Chat WhatsApp
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="mailto:hello@webcraft.id"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                <Mail size={20} />
                Kirim Email
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-3xl font-black text-white mb-3">
              Hubungi Kami
            </h3>
            <p className="text-white/40 mb-8">
              Tim kami siap membantu Anda 24/7. Pilih cara yang paling nyaman.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                {
                  icon: <MessageCircle size={20} className="text-green-400" />,
                  label: "WhatsApp",
                  value: "+62 812-3456-7890",
                  color: "bg-green-500/10 border-green-500/20",
                },
                {
                  icon: <Mail size={20} className="text-blue-400" />,
                  label: "Email",
                  value: "hello@webcraft.id",
                  color: "bg-blue-500/10 border-blue-500/20",
                },
                {
                  icon: <Phone size={20} className="text-violet-400" />,
                  label: "Telepon",
                  value: "+62 812-3456-7890",
                  color: "bg-violet-500/10 border-violet-500/20",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${item.color} backdrop-blur-sm`}
                >
                  <div className={`p-2.5 rounded-xl ${item.color}`}>{item.icon}</div>
                  <div>
                    <div className="text-white/40 text-xs">{item.label}</div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <div className="text-white/40 text-sm mb-3">Follow us</div>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram size={18} />, label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-500/30 hover:text-pink-400" },
                  { icon: <Twitter size={18} />, label: "Twitter", color: "hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-400" },
                  { icon: <Github size={18} />, label: "Github", color: "hover:bg-white/20 hover:border-white/30 hover:text-white" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl border border-white/10 text-white/40 transition-all duration-200 ${s.color}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {!sent ? (
                <>
                  <h3 className="text-2xl font-black text-white mb-6">
                    Kirim Pesan
                  </h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-white/50 text-sm mb-2">
                        Nama Anda
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="budi@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm mb-2">
                        Pesan
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Saya tertarik dengan website e-commerce..."
                        className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
                    >
                      <Send size={16} />
                      Kirim Pesan
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                  >
                    <CheckCircle size={32} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-black text-white mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-white/50">
                    Kami akan menghubungi Anda dalam 24 jam. Terima kasih!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm"
        >
          <div>© 2024 WebCraft. All rights reserved.</div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a key={item} href="#" className="hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
