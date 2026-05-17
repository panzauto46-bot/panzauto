import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, ImageIcon, Package, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n";
import { Product, useProducts } from "../../lib/products";

type View = "list" | "form";

const emptyForm: Omit<Product, "id"> = {
  name: "", nameId: "", diameter: "", height: "", finish: "", finishId: "",
  priceIdr: 0, img: "", description: "", descriptionId: "",
  features: [""], featuresId: [""], compatible: [""],
  rating: 5, reviews: 0, isNew: false,
};

export function SellerDashboard() {
  const { language } = useLanguage();
  const { session, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const isId = language === "id";

  const [view, setView] = useState<View>("list");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [imgError, setImgError] = useState(false);

  if (!session || session.role !== "owner") return null;

  const openAdd = () => { setForm(emptyForm); setEditId(null); setView("form"); setImgError(false); };
  const openEdit = (p: Product) => {
    setForm({ ...p }); setEditId(p.id); setView("form"); setImgError(false);
  };
  const handleLogout = () => { logout(); navigate("/login", { replace: true }); };

  const setField = <K extends keyof typeof form>(key: K, val: typeof form[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleListChange = (key: "features" | "featuresId" | "compatible", idx: number, val: string) => {
    const arr = [...form[key]]; arr[idx] = val;
    setField(key, arr);
  };
  const addListItem = (key: "features" | "featuresId" | "compatible") =>
    setField(key, [...form[key], ""]);
  const removeListItem = (key: "features" | "featuresId" | "compatible", idx: number) =>
    setField(key, form[key].filter((_, i) => i !== idx));

  const handleSave = async () => {
    if (!form.name.trim() || !form.nameId.trim() || form.priceIdr <= 0) return;
    const clean = {
      ...form,
      features: form.features.filter((f) => f.trim()),
      featuresId: form.featuresId.filter((f) => f.trim()),
      compatible: form.compatible.filter((c) => c.trim()),
    };
    if (editId !== null) { await updateProduct(editId, clean); } else { await addProduct(clean); }
    setView("list");
  };

  const handleDelete = async (id: number) => { await deleteProduct(id); setDeleteConfirm(null); };

  const inputCls = "w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black";
  const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500";
  const btnPrimary = "inline-flex items-center justify-center gap-2 bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors";
  const btnSecondary = "inline-flex items-center justify-center gap-2 border border-neutral-300 px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-100 transition-colors";

  // --- FORM VIEW ---
  if (view === "form") {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <button type="button" onClick={() => setView("list")} className="mb-6 inline-flex items-center gap-2 text-sm text-black hover:text-neutral-600 transition-colors">
          <ArrowLeft className="h-4 w-4" /> {isId ? "Kembali ke Daftar Produk" : "Back to Product List"}
        </button>
        <div className="border border-neutral-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-black mb-6">
            {editId !== null ? (isId ? "Edit Produk" : "Edit Product") : (isId ? "Tambah Produk Baru" : "Add New Product")}
          </h1>

          <div className="space-y-6">
            {/* Image URL + Preview */}
            <div>
              <label className={labelCls}>{isId ? "URL Gambar Produk" : "Product Image URL"}</label>
              <input value={form.img} onChange={(e) => { setField("img", e.target.value); setImgError(false); }} placeholder="https://..." className={inputCls} />
              {form.img && (
                <div className="mt-3 relative aspect-video w-full max-w-xs overflow-hidden border border-neutral-200 bg-neutral-100">
                  {imgError ? (
                    <div className="flex h-full items-center justify-center text-neutral-400">
                      <ImageIcon className="h-8 w-8" /><span className="ml-2 text-sm">Gambar tidak valid</span>
                    </div>
                  ) : (
                    <img src={form.img} alt="Preview" className="h-full w-full object-cover" onError={() => setImgError(true)} />
                  )}
                </div>
              )}
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>{isId ? "Nama Produk (EN)" : "Product Name (EN)"}</label>
                <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Custom Velo Standard" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{isId ? "Nama Produk (ID)" : "Product Name (ID)"}</label>
                <input value={form.nameId} onChange={(e) => setField("nameId", e.target.value)} placeholder="Custom Velo Standar" className={inputCls} />
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Diameter</label>
                <input value={form.diameter} onChange={(e) => setField("diameter", e.target.value)} placeholder="28 mm" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{isId ? "Tinggi" : "Height"}</label>
                <input value={form.height} onChange={(e) => setField("height", e.target.value)} placeholder="40 mm" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Finishing (EN)</label>
                <input value={form.finish} onChange={(e) => setField("finish", e.target.value)} placeholder="Black Anodize" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Finishing (ID)</label>
                <input value={form.finishId} onChange={(e) => setField("finishId", e.target.value)} placeholder="Anodize Hitam" className={inputCls} />
              </div>
            </div>

            {/* Price + Rating */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>{isId ? "Harga (IDR)" : "Price (IDR)"}</label>
                <input type="number" value={form.priceIdr || ""} onChange={(e) => setField("priceIdr", Number(e.target.value))} placeholder="80000" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Rating (1-5)</label>
                <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={(e) => setField("rating", Number(e.target.value))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{isId ? "Jumlah Ulasan" : "Review Count"}</label>
                <input type="number" min="0" value={form.reviews} onChange={(e) => setField("reviews", Number(e.target.value))} className={inputCls} />
              </div>
              <div className="flex items-end pb-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isNew} onChange={(e) => setField("isNew", e.target.checked)} className="h-4 w-4 accent-black" />
                  <span className="text-sm font-medium text-black">{isId ? "Tandai BARU" : "Mark as NEW"}</span>
                </label>
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>{isId ? "Deskripsi (EN)" : "Description (EN)"}</label>
                <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={3} className={inputCls + " resize-none"} />
              </div>
              <div>
                <label className={labelCls}>{isId ? "Deskripsi (ID)" : "Description (ID)"}</label>
                <textarea value={form.descriptionId} onChange={(e) => setField("descriptionId", e.target.value)} rows={3} className={inputCls + " resize-none"} />
              </div>
            </div>

            {/* Features EN */}
            <ListEditor label={isId ? "Fitur (EN)" : "Features (EN)"} items={form.features} labelCls={labelCls} inputCls={inputCls}
              onChange={(i, v) => handleListChange("features", i, v)}
              onAdd={() => addListItem("features")}
              onRemove={(i) => removeListItem("features", i)}
            />

            {/* Features ID */}
            <ListEditor label={isId ? "Fitur (ID)" : "Features (ID)"} items={form.featuresId} labelCls={labelCls} inputCls={inputCls}
              onChange={(i, v) => handleListChange("featuresId", i, v)}
              onAdd={() => addListItem("featuresId")}
              onRemove={(i) => removeListItem("featuresId", i)}
            />

            {/* Compatible */}
            <ListEditor label={isId ? "Motor Kompatibel" : "Compatible Bikes"} items={form.compatible} labelCls={labelCls} inputCls={inputCls}
              onChange={(i, v) => handleListChange("compatible", i, v)}
              onAdd={() => addListItem("compatible")}
              onRemove={(i) => removeListItem("compatible", i)}
              placeholder="Yamaha NMAX 155"
            />

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <button type="button" onClick={handleSave} disabled={!form.name.trim() || !form.nameId.trim() || form.priceIdr <= 0} className={btnPrimary + " disabled:opacity-50 disabled:cursor-not-allowed"}>
                {isId ? "Simpan Produk" : "Save Product"}
              </button>
              <button type="button" onClick={() => setView("list")} className={btnSecondary}>
                {isId ? "Batal" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- LIST VIEW ---
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border border-neutral-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              {isId ? "Dashboard Seller" : "Seller Dashboard"}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-black">
              {isId ? "Selamat datang," : "Welcome,"}{" "}
              <span className="underline underline-offset-4">{session.name}</span>
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              {isId ? "Owner Email" : "Owner Email"}: <span className="font-semibold">{session.email}</span>
            </p>
          </div>
          <button type="button" onClick={handleLogout} className={btnSecondary}>
            {isId ? "Keluar" : "Sign Out"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-500">{isId ? "Total Produk" : "Total Products"}</p>
            <p className="mt-2 text-2xl font-bold text-black">{products.length}</p>
          </div>
          <div className="border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-500">{isId ? "Produk Baru" : "New Products"}</p>
            <p className="mt-2 text-2xl font-bold text-black">{products.filter((p) => p.isNew).length}</p>
          </div>
          <div className="border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-500">{isId ? "Rata-rata Rating" : "Avg Rating"}</p>
            <p className="mt-2 text-2xl font-bold text-black">
              {products.length > 0 ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1) : "-"}
            </p>
          </div>
        </div>

        {/* Product List Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-black flex items-center gap-2">
            <Package className="h-5 w-5" /> {isId ? "Kelola Produk" : "Manage Products"}
          </h2>
          <button type="button" onClick={openAdd} className={btnPrimary}>
            <Plus className="h-4 w-4" /> {isId ? "Tambah" : "Add"}
          </button>
        </div>

        {/* Product Cards */}
        {products.length === 0 ? (
          <p className="text-sm text-neutral-500 py-8 text-center">{isId ? "Belum ada produk." : "No products yet."}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="border border-neutral-200 overflow-hidden group">
                <div className="aspect-video w-full bg-neutral-100 relative overflow-hidden">
                  {p.isNew && (
                    <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-0.5 text-[10px] font-bold tracking-wider">
                      {isId ? "BARU" : "NEW"}
                    </div>
                  )}
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black truncate">{isId ? p.nameId : p.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-mono">
                    {p.diameter} | {p.height} | {isId ? p.finishId : p.finish}
                  </p>
                  <p className="text-sm font-bold text-black mt-2 font-mono">
                    Rp {p.priceIdr.toLocaleString("id-ID")}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button type="button" onClick={() => openEdit(p)} className="flex-1 inline-flex items-center justify-center gap-1 border border-neutral-300 px-3 py-1.5 text-xs font-medium text-black hover:bg-neutral-100 transition-colors">
                      <Edit2 className="h-3 w-3" /> Edit
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex-1 flex gap-1">
                        <button type="button" onClick={() => handleDelete(p.id)} className="flex-1 bg-red-600 text-white text-xs px-2 py-1.5 font-medium hover:bg-red-700 transition-colors">
                          {isId ? "Ya" : "Yes"}
                        </button>
                        <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 border border-neutral-300 text-xs px-2 py-1.5 font-medium hover:bg-neutral-100 transition-colors">
                          {isId ? "Tidak" : "No"}
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setDeleteConfirm(p.id)} className="inline-flex items-center justify-center gap-1 border border-neutral-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="h-3 w-3" /> {isId ? "Hapus" : "Delete"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Reusable list editor for features / compatible */
function ListEditor({ label, items, labelCls, inputCls, onChange, onAdd, onRemove, placeholder }:
  { label: string; items: string[]; labelCls: string; inputCls: string; placeholder?: string;
    onChange: (i: number, v: string) => void; onAdd: () => void; onRemove: (i: number) => void; }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={(e) => onChange(i, e.target.value)} placeholder={placeholder || `Item ${i + 1}`} className={inputCls} />
            {items.length > 1 && (
              <button type="button" onClick={() => onRemove(i)} className="px-2 text-neutral-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={onAdd} className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-black transition-colors mt-1">
          <Plus className="h-3 w-3" /> Tambah
        </button>
      </div>
    </div>
  );
}
