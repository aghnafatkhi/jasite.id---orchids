"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Users, Code2, Clock } from "lucide-react";

function CountUp({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: <Trophy size={28} />,
    value: 265,
    suffix: "+",
    label: "Website Terjual",
    sublabel: "kepada klien puas",
    color: "from-yellow-400 to-orange-500",
    glow: "shadow-orange-500/30",
  },
  {
    icon: <Users size={28} />,
    value: 240,
    suffix: "+",
    label: "Klien Aktif",
    sublabel: "dari berbagai industri",
    color: "from-violet-400 to-purple-600",
    glow: "shadow-violet-500/30",
  },
  {
    icon: <Code2 size={28} />,
    value: 98,
    suffix: "%",
    label: "Kepuasan Klien",
    sublabel: "berdasarkan review",
    color: "from-cyan-400 to-blue-500",
    glow: "shadow-cyan-500/30",
  },
  {
    icon: <Clock size={28} />,
    value: 24,
    suffix: "h",
    label: "Support Time",
    sublabel: "respon cepat & ramah",
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/30",
  },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Angka yang{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Berbicara
            </span>
          </h2>
          <p className="text-white/40 text-lg">
            Dibuktikan dengan ratusan klien yang berhasil
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div
                className={`relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-xl ${stat.glow} hover:shadow-2xl overflow-hidden`}
              >
                {/* Glow bg */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 text-white mb-4 shadow-lg`}
                >
                  {stat.icon}
                </div>

                {/* Value */}
                <div
                  className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-white font-semibold text-base md:text-lg mt-1">
                  {stat.label}
                </div>
                <div className="text-white/40 text-sm mt-0.5">{stat.sublabel}</div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
