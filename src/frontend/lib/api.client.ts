"use client";
import { config } from "./config";

const TOKEN_KEY = "cla.token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${config.apiUrl}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw Object.assign(new Error(data?.error ?? res.statusText), { code: data?.code, status: res.status });
  return data as T;
}

export const api = {
  register: (body: { email: string; password: string; name: string }) =>
    request<{ token: string; user: any }>("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: any }>("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request<{ user: any }>("/api/auth/me"),

  eligibilityQuestions: () => request<{ questions: any[] }>("/api/eligibility/questions"),
  checkEligibility: (answers: Record<string, unknown>) =>
    request<{ result: any; applicationId: string }>("/api/eligibility/check", {
      method: "POST",
      body: JSON.stringify({ answers }),
    }),

  generateRoadmap: (applicationId: string) =>
    request<{ steps: any[] }>("/api/roadmap/generate", {
      method: "POST",
      body: JSON.stringify({ applicationId }),
    }),
  getRoadmap: (applicationId: string) => request<{ steps: any[] }>(`/api/roadmap/${applicationId}`),
  updateStep: (id: string, status: string) =>
    request<{ ok: true }>(`/api/roadmap/step/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  listDocuments: () => request<{ documents: any[] }>("/api/documents"),
  uploadDocument: (file: File, docType: string, applicationId?: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("docType", docType);
    if (applicationId) fd.append("applicationId", applicationId);
    return request<{ document: any }>("/api/documents/upload", { method: "POST", body: fd });
  },
  deleteDocument: (id: string) =>
    request<{ ok: true }>(`/api/documents/${id}`, { method: "DELETE" }),

  getApplication: () => request<{ application: any }>("/api/application"),
  createApplication: () => request<{ application: any }>("/api/application", { method: "POST" }),
  submitApplication: (id: string) =>
    request<{ application: any }>(`/api/application/${id}/submit`, { method: "POST" }),

  renewalStatus: () => request<{ renewal: any }>("/api/renewal"),

  checkout: (plan: "starter" | "pro" | "business") =>
    request<{ url: string }>("/api/billing/checkout", {
      method: "POST",
      body: JSON.stringify({ plan }),
    }),
  portal: () => request<{ url: string }>("/api/billing/portal", { method: "POST" }),
};
