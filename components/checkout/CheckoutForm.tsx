"use client";

import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, MapPin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkoutSchema, type CheckoutValues } from "@/lib/validation/checkout";
import { useCartStore, useCartSubtotal } from "@/store/cart-store";
import { DeliveryToggle } from "./DeliveryToggle";
import { StorePicker } from "./StorePicker";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { OrderSummary, computeTotals } from "./OrderSummary";
import { OrderSuccess, type CompletedOrder } from "./OrderSuccess";

const PAYMENTS = [
  { v: "cash", label: "Готівкою при отриманні" },
  { v: "card", label: "Карткою при отриманні" },
] as const;

export function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartSubtotal();
  const clearCart = useCartStore((s) => s.clear);

  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState<CompletedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      fulfillment: "delivery",
      address: "",
      storeId: "",
      timeSlot: "",
      payment: "cash",
      comment: "",
    },
  });

  const setOpts = { shouldValidate: true, shouldDirty: true } as const;

  const fulfillment = watch("fulfillment");
  const storeId = watch("storeId");
  const timeSlot = watch("timeSlot");
  const payment = watch("payment");

  const onSubmit = async (data: CheckoutValues) => {
    setSubmitting(true);
    setError(null);
    const { total } = computeTotals(subtotal, data.fulfillment);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: data, items, subtotal, total }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "request_failed");

      const order: CompletedOrder = {
        number: json.number,
        name: data.name,
        phone: data.phone,
        fulfillment: data.fulfillment,
        total,
      };
      clearCart();
      setCompleted(order);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "Не вдалося оформити замовлення. Спробуйте ще раз або зателефонуйте нам."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (completed) return <OrderSuccess order={completed} />;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line py-16 text-center text-cream-muted">
        Кошик порожній. Додайте товари, щоб оформити замовлення.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12"
    >
      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="mb-1 font-display text-lg font-bold text-cream">
            Контактні дані
          </legend>
          <TextField
            label="Ім'я та прізвище"
            Icon={User}
            placeholder="Іван Петренко"
            error={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Телефон"
            Icon={Phone}
            type="tel"
            placeholder="+380 67 123 45 67"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-1 font-display text-lg font-bold text-cream">
            Спосіб отримання
          </legend>
          <DeliveryToggle
            value={fulfillment}
            onChange={(v) => setValue("fulfillment", v, setOpts)}
          />

          {fulfillment === "delivery" ? (
            <TextField
              label="Адреса доставки"
              Icon={MapPin}
              placeholder="вул. Хрещатик, 1, кв. 5"
              error={errors.address?.message}
              {...register("address")}
            />
          ) : (
            <div>
              <p className="mb-3 text-sm font-semibold text-cream">Оберіть магазин</p>
              <StorePicker value={storeId} onChange={(id) => setValue("storeId", id, setOpts)} />
              {errors.storeId && (
                <p className="mt-2 text-sm text-claw-400">{errors.storeId.message}</p>
              )}
            </div>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-display text-lg font-bold text-cream">
            Зручний час
          </legend>
          <TimeSlotPicker value={timeSlot} onChange={(s) => setValue("timeSlot", s, setOpts)} />
          {errors.timeSlot && (
            <p className="mt-2 text-sm text-claw-400">{errors.timeSlot.message}</p>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-display text-lg font-bold text-cream">
            Оплата
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PAYMENTS.map((o) => {
              const active = payment === o.v;
              return (
                <button
                  key={o.v}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setValue("payment", o.v, setOpts)}
                  className={cn(
                    "focus-ring rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ease-smooth active:scale-95",
                    active
                      ? "border-claw bg-claw/10 text-cream"
                      : "border-line bg-ink-800 text-cream-muted hover:border-line-strong"
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-display text-lg font-bold text-cream">
            Коментар
          </legend>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-cream-dim" />
            <textarea
              rows={3}
              placeholder="Побажання щодо варки, час, орієнтири для кур'єра…"
              className="focus-ring w-full resize-none rounded-xl border border-line bg-ink-800 py-3 pl-11 pr-4 text-cream placeholder:text-cream-muted"
              {...register("comment")}
            />
          </div>
          {errors.comment && (
            <p className="mt-2 text-sm text-claw-400">{errors.comment.message}</p>
          )}
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary items={items} subtotal={subtotal} fulfillment={fulfillment} />
        {error && (
          <p className="mt-4 rounded-xl border border-claw/40 bg-claw/10 px-4 py-3 text-sm text-claw-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="focus-ring mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-claw text-base font-semibold text-cream transition-all duration-200 ease-smooth hover:bg-claw-400 active:translate-y-[1px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
        >
          {submitting ? "Оформлюємо…" : "Підтвердити замовлення"}
        </button>
        <p className="mt-3 text-center text-xs text-cream-dim">
          Натискаючи кнопку, ви погоджуєтесь із умовами обробки замовлення.
        </p>
      </div>
    </form>
  );
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  Icon: typeof User;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, Icon, className, ...rest }, ref) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-cream">{label}</label>
        <div className="relative">
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-cream-dim" />
          <input
            ref={ref}
            className={cn(
              "focus-ring h-12 w-full rounded-xl border bg-ink-800 pl-11 pr-4 text-cream placeholder:text-cream-muted",
              error ? "border-claw/60" : "border-line",
              className
            )}
            {...rest}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-claw-400">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
