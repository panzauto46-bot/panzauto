import { CheckCircle2, CreditCard, Trash2, X, AlertCircle } from "lucide-react";
import { FormEvent, useState, useEffect, useRef } from "react";
import { useCart } from "../../lib/cart";
import { useLanguage } from "../../lib/i18n";

type PaymentMethod = "transfer" | "ewallet";
const bankTransferAccount = {
  bank: "BRI",
  accountNumber: "7369-01-028321-53-0",
  accountHolder: "Pandu Darma Anugrah",
};

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

export function CartDrawer() {
  const { t, formatCurrency } = useLanguage();
  const { isCartOpen, closeCart, items, subtotal, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!fullName || fullName.trim().length < 3) {
      errors.fullName = t("cart.formName") + " must be at least 3 characters";
    }

    if (!phone) {
      errors.phone = t("cart.formPhone") + " is required";
    } else {
      const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
      const cleanPhone = phone.replace(/[\s-]/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        errors.phone = "Invalid phone number format";
      }
    }

    if (!address || address.trim().length < 10) {
      errors.address = t("cart.formAddress") + " must be at least 10 characters";
    }

    return errors;
  };

  useEffect(() => {
    if (isCartOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleClose();
        }
      };

      const handleTab = (event: KeyboardEvent) => {
        if (event.key === "Tab" && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTab);
      closeButtonRef.current?.focus();

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTab);
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
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
    setFormErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/50 p-2 sm:p-4"
      onClick={handleClose}
      role="presentation"
    >
      <aside
        ref={drawerRef}
        className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <h2 id="cart-title" className="text-lg font-bold text-black">{t("cart.title")}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
            aria-label={t("cart.close")}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-auto px-4 py-4" role="region" aria-live="polite">
          {isPaymentSuccess ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4" role="status">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-black">{t("cart.successTitle")}</p>
                  <p className="mt-1 text-sm text-neutral-600">{t("cart.successDesc")}</p>
                </div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-neutral-600" role="status">{t("cart.empty")}</p>
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
                      className="inline-flex h-8 w-8 items-center justify-center border border-neutral-300 text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                      aria-label={`${t("cart.remove")} ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
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
                <form className="mb-4 space-y-3" onSubmit={handleCheckoutSubmit} aria-label="Checkout form">
                  <div>
                    <label htmlFor="fullName" className="sr-only">
                      {t("cart.formName")}
                    </label>
                    <input
                      id="fullName"
                      required
                      name="fullName"
                      placeholder={t("cart.formName")}
                      className={`w-full border px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded ${
                        formErrors.fullName ? "border-red-500" : "border-neutral-300"
                      }`}
                      aria-invalid={!!formErrors.fullName}
                      aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
                    />
                    {formErrors.fullName && (
                      <p id="fullName-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="sr-only">
                      {t("cart.formPhone")}
                    </label>
                    <input
                      id="phone"
                      required
                      name="phone"
                      type="tel"
                      placeholder={t("cart.formPhone")}
                      className={`w-full border px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded ${
                        formErrors.phone ? "border-red-500" : "border-neutral-300"
                      }`}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={formErrors.phone ? "phone-error" : undefined}
                    />
                    {formErrors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="sr-only">
                      {t("cart.formAddress")}
                    </label>
                    <textarea
                      id="address"
                      required
                      name="address"
                      placeholder={t("cart.formAddress")}
                      rows={3}
                      className={`w-full border px-3 py-2 text-sm focus:border-black focus:outline-none resize-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded ${
                        formErrors.address ? "border-red-500" : "border-neutral-300"
                      }`}
                      aria-invalid={!!formErrors.address}
                      aria-describedby={formErrors.address ? "address-error" : undefined}
                    />
                    {formErrors.address && (
                      <p id="address-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="paymentMethod" className="block text-xs font-semibold uppercase tracking-wider text-black">
                      {t("cart.formMethod")}
                    </label>
                    <select
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                      className="w-full border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                    >
                      <option value="transfer">{t("cart.methodTransfer")}</option>
                      <option value="ewallet">{t("cart.methodEwallet")}</option>
                    </select>
                  </div>

                  {paymentMethod === "transfer" && (
                    <div className="rounded-md border border-neutral-300 bg-neutral-50 p-3" role="region" aria-label="Bank transfer information">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                        {t("cart.transferTo")}
                      </p>
                      <p className="mt-2 text-sm text-black">
                        <span className="font-medium">{t("cart.bankName")}:</span> {bankTransferAccount.bank}
                      </p>
                      <p className="mt-1 text-sm text-black">
                        <span className="font-medium">{t("cart.accountNumber")}:</span>{" "}
                        <span className="font-mono">{bankTransferAccount.accountNumber}</span>
                      </p>
                      <p className="mt-1 text-sm text-black">
                        <span className="font-medium">{t("cart.accountHolder")}:</span>{" "}
                        {bankTransferAccount.accountHolder}
                      </p>
                      <p className="mt-2 text-xs text-neutral-600">{t("cart.transferNote")}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="inline-flex w-full items-center justify-center gap-2 bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                  >
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
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
              className="border border-neutral-300 px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
            >
              {t("cart.close")}
            </button>

            {isPaymentSuccess ? (
              <button
                type="button"
                onClick={handleClose}
                className="bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                {t("cart.continue")}
              </button>
            ) : isCheckingOut ? (
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                {t("cart.back")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCheckingOut(true)}
                disabled={items.length === 0}
                className="bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
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
