import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n";
import { supabase } from "../../lib/supabase";

interface Order {
  id: string;
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  shipping_address: string;
  courier: string;
  total_amount: number;
  status: string;
  items: any[];
  created_at: string;
}

export function OrderHistory() {
  const { session, isBuyer } = useAuth();
  const { t, formatCurrency, language } = useLanguage();
  const isId = language === "id";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isBuyer || !session || !supabase) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("buyer_email", (session as any).email)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setOrders(data as Order[]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, isBuyer]);

  if (!isBuyer) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-black">{isId ? "Akses Ditolak" : "Access Denied"}</h2>
        <p className="mt-2 text-neutral-600">
          {isId ? "Silakan login sebagai pembeli untuk melihat riwayat pesanan." : "Please login as a buyer to view order history."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-[70vh]">
      <h1 className="mb-8 text-2xl font-bold text-black flex items-center gap-2">
        <Package className="h-6 w-6" />
        {isId ? "Pesanan Saya" : "My Orders"}
      </h1>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-r-transparent"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
          <p className="text-neutral-500">{isId ? "Anda belum memiliki riwayat pesanan." : "You have no order history yet."}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">
                    {new Date(order.created_at).toLocaleDateString(isId ? "id-ID" : "en-US", {
                      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                  <p className="text-sm font-mono text-black">Order ID: {order.id.split("-")[0]}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">{isId ? "Total Belanja" : "Total Amount"}</p>
                    <p className="font-bold text-black">{formatCurrency(order.total_amount)}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">{isId ? "Daftar Barang" : "Items"}</p>
                  <ul className="space-y-2">
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx} className="flex justify-between text-sm">
                        <span className="text-black">- {item.title} ({item.quantity || 1}x)</span>
                        <span className="text-neutral-600">{formatCurrency(item.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded border border-neutral-100 bg-neutral-50 p-3 text-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">{isId ? "Pengiriman" : "Shipping"}</p>
                  <p className="text-black"><span className="font-medium">{order.buyer_name}</span> ({order.buyer_phone})</p>
                  <p className="text-neutral-600 mt-1">{order.shipping_address}</p>
                  <p className="text-neutral-600 mt-1"><span className="font-medium">Kurir:</span> {order.courier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
