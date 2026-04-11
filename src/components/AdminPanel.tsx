"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Save,
  FolderOpen,
  Globe,
  Tag,
  DollarSign,
  Image,
  Star,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import type { WebsiteCategory, WebsiteItem } from "@/lib/store";
import { saveCategories, saveWebsites } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: WebsiteCategory[];
  websites: WebsiteItem[];
  onCategoriesChange: (cats: WebsiteCategory[]) => void;
  onWebsitesChange: (sites: WebsiteItem[]) => void;
}

const GRADIENT_OPTIONS = [
  { label: "Violet → Purple", value: "from-violet-600 to-purple-700" },
  { label: "Blue → Cyan", value: "from-blue-600 to-cyan-700" },
  { label: "Orange → Rose", value: "from-orange-500 to-rose-600" },
  { label: "Emerald → Teal", value: "from-emerald-500 to-teal-600" },
  { label: "Pink → Rose", value: "from-pink-500 to-rose-600" },
  { label: "Indigo → Blue", value: "from-indigo-600 to-blue-700" },
  { label: "Yellow → Orange", value: "from-yellow-500 to-orange-500" },
  { label: "Red → Pink", value: "from-red-500 to-pink-600" },
];

function CatEditor({
  cat,
  onSave,
  onCancel,
}: {
  cat: Partial<WebsiteCategory>;
  onSave: (c: WebsiteCategory) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<WebsiteCategory>>(cat);

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-violet-500/30">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">Nama Kategori *</label>
          <input
            value={form.name ?? ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="E-Commerce"
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Icon (emoji)</label>
          <input
            value={form.icon ?? ""}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="🛒"
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Slug</label>
          <input
            value={form.slug ?? ""}
            onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
            placeholder="ecommerce"
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">Deskripsi</label>
          <input
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deskripsi singkat kategori"
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">Warna Gradient</label>
          <select
            value={form.color ?? ""}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#1a1a2e] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          >
            <option value="">Pilih gradient...</option>
            {GRADIENT_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
          {form.color && (
            <div className={`mt-2 h-3 rounded-full bg-gradient-to-r ${form.color}`} />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!form.name || !form.icon || !form.color) return;
            onSave({
              id: form.id ?? String(Date.now()),
              name: form.name!,
              slug: form.slug ?? form.name!.toLowerCase().replace(/\s+/g, "-"),
              icon: form.icon!,
              color: form.color!,
              description: form.description ?? "",
            });
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
        >
          <Save size={14} />
          Simpan
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/15 text-white/60 text-sm transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

function SiteEditor({
  site,
  categories,
  onSave,
  onCancel,
}: {
  site: Partial<WebsiteItem>;
  categories: WebsiteCategory[];
  onSave: (s: WebsiteItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<WebsiteItem>>(site);
  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-violet-500/30 max-h-[600px] overflow-y-auto custom-scroll">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">Judul Website *</label>
          <input
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="LuxeShop Pro"
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">Deskripsi</label>
          <textarea
            rows={3}
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50 resize-none"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Kategori *</label>
          <select
            value={form.categoryId ?? ""}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#1a1a2e] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          >
            <option value="">Pilih kategori...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Harga (IDR) *</label>
          <input
            type="number"
            value={form.price ?? ""}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="2500000"
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">URL Gambar</label>
          <input
            value={form.imageUrl ?? ""}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Rating (1-5)</label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={form.rating ?? 4.5}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Jumlah Terjual</label>
          <input
            type="number"
            value={form.sold ?? 0}
            onChange={(e) => setForm({ ...form, sold: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        {/* Tech Stack */}
        <div className="col-span-2">
          <label className="text-white/40 text-xs mb-1 block">Tech Stack</label>
          <div className="flex gap-2 mb-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && techInput) {
                  setForm({ ...form, techStack: [...(form.techStack ?? []), techInput] });
                  setTechInput("");
                }
              }}
              placeholder="Next.js (tekan Enter)"
              className="flex-1 px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(form.techStack ?? []).map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-xs cursor-pointer hover:bg-red-500/20 hover:text-red-300 transition-colors"
                onClick={() => setForm({ ...form, techStack: (form.techStack ?? []).filter((x) => x !== t) })}
              >
                {t} ×
              </span>
            ))}
          </div>
        </div>
        {/* Featured toggle */}
        <div className="col-span-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, featured: !form.featured })}
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            {form.featured ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          </button>
          <span className="text-white/60 text-sm">
            {form.featured ? "Featured (tampil di showcase)" : "Tidak featured"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!form.title || !form.categoryId) return;
            onSave({
              id: form.id ?? String(Date.now()),
              title: form.title!,
              description: form.description ?? "",
              categoryId: form.categoryId!,
              price: form.price ?? 0,
              imageUrl: form.imageUrl ?? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
              tags: form.tags ?? [],
              featured: form.featured ?? false,
              techStack: form.techStack ?? [],
              demoUrl: form.demoUrl ?? "#",
              rating: form.rating ?? 4.5,
              sold: form.sold ?? 0,
            });
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
        >
          <Save size={14} />
          Simpan
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/15 text-white/60 text-sm transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

export default function AdminPanel({
  open,
  onClose,
  categories,
  websites,
  onCategoriesChange,
  onWebsitesChange,
}: Props) {
  const [tab, setTab] = useState<"categories" | "websites">("categories");
  const [editingCat, setEditingCat] = useState<Partial<WebsiteCategory> | null>(null);
  const [editingSite, setEditingSite] = useState<Partial<WebsiteItem> | null>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const saveCat = (cat: WebsiteCategory) => {
    const exists = categories.find((c) => c.id === cat.id);
    const updated = exists
      ? categories.map((c) => (c.id === cat.id ? cat : c))
      : [...categories, cat];
    onCategoriesChange(updated);
    saveCategories(updated);
    setEditingCat(null);
  };

  const deleteCat = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    onCategoriesChange(updated);
    saveCategories(updated);
  };

  const saveSite = (site: WebsiteItem) => {
    const exists = websites.find((w) => w.id === site.id);
    const updated = exists
      ? websites.map((w) => (w.id === site.id ? site : w))
      : [...websites, site];
    onWebsitesChange(updated);
    saveWebsites(updated);
    setEditingSite(null);
  };

  const deleteSite = (id: string) => {
    const updated = websites.filter((w) => w.id !== id);
    onWebsitesChange(updated);
    saveWebsites(updated);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-[#0a0a14] border-l border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-white font-black text-xl">Admin Panel</h2>
                <p className="text-white/40 text-sm">Kelola katalog website Anda</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-3 bg-white/3 border-b border-white/10">
              <button
                onClick={() => setTab("categories")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tab === "categories"
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <FolderOpen size={15} />
                Kategori ({categories.length})
              </button>
              <button
                onClick={() => setTab("websites")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tab === "websites"
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Globe size={15} />
                Website ({websites.length})
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {/* ─── Categories Tab ─── */}
              {tab === "categories" && (
                <>
                  <button
                    onClick={() => setEditingCat({ name: "", icon: "", slug: "", color: "", description: "" })}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-violet-500/30 hover:border-violet-500/60 text-violet-400 hover:text-violet-300 font-semibold text-sm transition-all"
                  >
                    <Plus size={16} />
                    Tambah Kategori Baru
                  </button>

                  {editingCat && !editingCat.id && (
                    <CatEditor
                      cat={editingCat}
                      onSave={saveCat}
                      onCancel={() => setEditingCat(null)}
                    />
                  )}

                  {categories.map((cat) => (
                    <div key={cat.id} className="rounded-2xl bg-white/4 border border-white/8 overflow-hidden">
                      <div className="flex items-center gap-3 p-4">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg shadow-md`}
                        >
                          {cat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm truncate">{cat.name}</div>
                          <div className="text-white/40 text-xs truncate">{cat.description}</div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingCat(cat)}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteCat(cat.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {editingCat?.id === cat.id && (
                        <div className="px-4 pb-4">
                          <CatEditor
                            cat={editingCat}
                            onSave={saveCat}
                            onCancel={() => setEditingCat(null)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* ─── Websites Tab ─── */}
              {tab === "websites" && (
                <>
                  <button
                    onClick={() =>
                      setEditingSite({
                        title: "",
                        description: "",
                        categoryId: "",
                        price: 0,
                        imageUrl: "",
                        tags: [],
                        featured: false,
                        techStack: [],
                        rating: 4.5,
                        sold: 0,
                      })
                    }
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-violet-500/30 hover:border-violet-500/60 text-violet-400 hover:text-violet-300 font-semibold text-sm transition-all"
                  >
                    <Plus size={16} />
                    Tambah Website Baru
                  </button>

                  {editingSite && !editingSite.id && (
                    <SiteEditor
                      site={editingSite}
                      categories={categories}
                      onSave={saveSite}
                      onCancel={() => setEditingSite(null)}
                    />
                  )}

                  {websites.map((site) => {
                    const cat = categories.find((c) => c.id === site.categoryId);
                    return (
                      <div key={site.id} className="rounded-2xl bg-white/4 border border-white/8 overflow-hidden">
                        <div className="flex items-center gap-3 p-4">
                          <div
                            className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/10"
                          >
                            <img src={site.imageUrl} alt={site.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold text-sm truncate">{site.title}</span>
                              {site.featured && (
                                <span className="px-1.5 py-0.5 rounded-md bg-yellow-500/20 text-yellow-400 text-xs">★</span>
                              )}
                            </div>
                            <div className="text-violet-400 text-xs">
                              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(site.price)}
                            </div>
                            {cat && (
                              <span className="text-white/30 text-xs">{cat.icon} {cat.name}</span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingSite(site)}
                              className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => deleteSite(site.id)}
                              className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        {editingSite?.id === site.id && (
                          <div className="px-4 pb-4">
                            <SiteEditor
                              site={editingSite}
                              categories={categories}
                              onSave={saveSite}
                              onCancel={() => setEditingSite(null)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <AlertCircle size={14} className="text-violet-400 shrink-0 mt-0.5" />
                <p className="text-violet-300/70 text-xs">
                  Data tersimpan di browser (localStorage). Hubungkan database untuk produksi.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
