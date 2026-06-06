"use client";
import { useState } from "react";
import { api, setToken } from "../../lib/api.client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res =
        mode === "login"
          ? await api.login({ email, password })
          : await api.register({ email, password, name });
      setToken(res.token);
      const next = new URLSearchParams(window.location.search).get("next") ?? "/dashboard";
      window.location.href = next;
    } catch (ex: any) {
      setErr(ex?.message ?? "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <h1 className="h2">{mode === "login" ? "Sign in" : "Create your account"}</h1>
        <form onSubmit={submit} className="card" style={{ marginTop: 16 }}>
          {mode === "register" && (
            <>
              <label className="label">Name</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
            </>
          )}
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          {err && <div className="alert alert-err">{err}</div>}
          <button className="btn btn-primary" style={{ marginTop: 20, width: "100%" }} disabled={busy}>
            {busy ? "Working…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
          <p style={{ marginTop: 14, color: "var(--fg-muted)", fontSize: 14 }}>
            {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode(mode === "login" ? "register" : "login");
              }}
            >
              {mode === "login" ? "Create one" : "Sign in"}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
