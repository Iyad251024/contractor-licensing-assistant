"use client";
import { api } from "./api.client";

export async function startCheckout(plan: "starter" | "pro" | "business") {
  const { url } = await api.checkout(plan);
  window.location.href = url;
}

export async function openPortal() {
  const { url } = await api.portal();
  window.location.href = url;
}
