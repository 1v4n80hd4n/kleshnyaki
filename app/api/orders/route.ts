import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validation/checkout";

interface OrderPayload {
  customer?: unknown;
  items?: unknown;
  subtotal?: unknown;
  total?: unknown;
}

export async function POST(request: Request) {
  let payload: OrderPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(payload.customer);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return NextResponse.json({ ok: false, error: "empty_cart" }, { status: 422 });
  }

  const number = `КЛ-${Date.now().toString().slice(-6)}`;

  return NextResponse.json({ ok: true, number });
}
