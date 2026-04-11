"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CatalogSection from "@/components/CatalogSection";
import FeaturedSection from "@/components/FeaturedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import AdminPanel from "@/components/AdminPanel";
import {
  getCategories,
  getWebsites,
  defaultTestimonials,
  type WebsiteCategory,
  type WebsiteItem,
} from "@/lib/store";

export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [categories, setCategories] = useState<WebsiteCategory[]>([]);
  const [websites, setWebsites] = useState<WebsiteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCategories(getCategories());
    setWebsites(getWebsites());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      <Navbar onAdminOpen={() => setAdminOpen(true)} />
      <HeroSection />
      <StatsSection />
      <CatalogSection categories={categories} websites={websites} />
      <FeaturedSection categories={categories} websites={websites} />
      <TestimonialsSection testimonials={defaultTestimonials} />
      <ContactSection />

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        categories={categories}
        websites={websites}
        onCategoriesChange={setCategories}
        onWebsitesChange={setWebsites}
      />
    </main>
  );
}
