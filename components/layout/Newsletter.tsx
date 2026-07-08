"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = () => {
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  if (status === "done") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-line-gold bg-ink-800 px-4 py-3 text-sm text-cream">
        <Check className="h-4 w-4 text-claw" strokeWidth={2.4} />
        Дякуємо! Ми повідомимо про сезон і акції.
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="ваша пошта"
          aria-label="Електронна пошта для розсилки"
          className={cn(
            "focus-ring h-11 w-full rounded-xl border bg-ink-800 px-4 text-sm text-cream placeholder:text-cream-dim",
            status === "error" ? "border-claw/60" : "border-line"
          )}
        />
        <button
          type="button"
          onClick={submit}
          aria-label="Підписатися"
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-claw text-cream transition-all duration-200 ease-smooth active:scale-95 hover:bg-claw-400"
        >
          <Send className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-claw-400">Перевірте формат пошти.</p>
      )}
    </div>
  );
}
