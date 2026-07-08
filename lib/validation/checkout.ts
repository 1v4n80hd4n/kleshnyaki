import { z } from "zod";

const isValidUaPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "");
  return d.length === 10 || (d.length === 12 && d.startsWith("380"));
};

export const checkoutSchema = z
  .object({
    name: z.string().trim().min(2, "Вкажіть ім'я (мінімум 2 літери)"),
    phone: z
      .string()
      .trim()
      .min(1, "Вкажіть номер телефону")
      .refine(isValidUaPhone, "Невірний формат. Приклад: +380 67 123 45 67"),
    fulfillment: z.enum(["delivery", "pickup"]),
    address: z.string().trim().optional(),
    storeId: z.string().optional(),
    timeSlot: z.string().min(1, "Оберіть зручний час"),
    payment: z.enum(["cash", "card"]),
    comment: z.string().trim().max(500, "Занадто довгий коментар").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.fulfillment === "delivery") {
      if (!data.address || data.address.trim().length < 5) {
        ctx.addIssue({
          path: ["address"],
          code: z.ZodIssueCode.custom,
          message: "Вкажіть адресу доставки (вулиця, будинок)",
        });
      }
    }
    if (data.fulfillment === "pickup" && !data.storeId) {
      ctx.addIssue({
        path: ["storeId"],
        code: z.ZodIssueCode.custom,
        message: "Оберіть магазин для самовивозу",
      });
    }
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;
