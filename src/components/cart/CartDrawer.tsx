import { CheckCircle2, CreditCard, Trash2, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCart } from "../../lib/cart";
import { useLanguage } from "../../lib/i18n";

type PaymentMethod = "transfer" | "ewallet";

export function CartDrawer() {
  const { t, formatCurrency } = useLanguage();
  const { isCartOpen, closeCart, items, subtotal, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");

  if (!isCartOpen) {
    return null;
  }

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setIsPaymentSuccess(true);
      clearCart();
    }, 900);
  };

  const handleClose = () => {
    closeCart();
    setIsCheckingOut(false);
    setIsPaymentSuccess(false);
    setIsPaying(false);
    setPaymentMethod("transfer");
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/50 p-2 sm:p-4"
      onClick={handleClose}
      role="presentation"
    >
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
      >
        <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <h2 className="text-lg font-bold text-black">{t("cart.title")}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
            aria-label={t("cart.close")}
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-auto px-4 py-4">
          {isPaymentSuccess ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-black">{t("cart.successTitle")}</p>
                  <p className="mt-1 text-sm text-neutral-600">{t("cart.successDesc")}</p>
                </div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-neutral-600">{t("cart.empty")}</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-lg border border-neutral-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-black">{item.title}</p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.year} | {item.color} | {item.throttleBody} | {item.throttleBodySize} | {item.velocityStackHeight}
                      </p>
                      <p className="mt-2 font-mono text-sm text-black">{formatCurrency(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
                      aria-label={t("cart.remove")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-neutral-200 px-4 py-4">
          {!isPaymentSuccess && (
            <>
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-neutral-600">{t("cart.subtotal")}</span>
                <span className="font-semibold text-black">{formatCurrency(subtotal)}</span>
              </div>

              {items.length > 0 && isCheckingOut && (
                <form className="mb-4 space-y-3" onSubmit={handleCheckoutSubmit}>
                  <input
                    required
                    name="fullName"
                    placeholder={t("cart.formName")}
                    className="w-full border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                  <input
                    required
                    name="phone"
                    placeholder={t("cart.formPhone")}
                    className="w-full border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                  <input
                    required
                    name="address"
                    placeholder={t("cart.formAddress")}
                    className="w-full border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />

                  <label className="block text-xs font-semibold uppercase tracking-wider text-black">
                    {t("cart.formMethod")}
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                    className="w-full border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  >
                    <option value="transfer">{t("cart.methodTransfer")}</option>
                    <option value="ewallet">{t("cart.methodEwallet")}</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="inline-flex w-full items-center justify-center gap-2 bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>{isPaying ? t("cart.processing") : t("cart.payNow")}</span>
                  </button>
                </form>
              )}
            </>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="border border-neutral-300 px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-100 transition-colors"
            >
              {t("cart.close")}
            </button>

            {isPaymentSuccess ? (
              <button
                type="button"
                onClick={handleClose}
                className="bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                {t("cart.continue")}
              </button>
            ) : isCheckingOut ? (
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                {t("cart.back")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCheckingOut(true)}
                disabled={items.length === 0}
                className="bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {t("cart.checkout")}
              </button>
            )}
          </div>
        </footer>
      </aside>
    </div>
  );
}
