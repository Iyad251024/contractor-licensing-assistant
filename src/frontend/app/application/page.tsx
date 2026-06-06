"use client";
import { useEffect, useState } from "react";
import { api, getToken } from "../../lib/api.client";

export default function ApplicationPage() {
  const [app, setApp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?next=/application";
      return;
    }
    api.getApplication().then((r) => setApp(r.application)).catch((e) => setErr(e?.message));
  }, []);

  async function submit() {
    if (!app) return;
    setBusy(true);
    setErr(null);
    try {
      const r = await api.submitApplication(app.id);
      setApp(r.application);
    } catch (e: any) {
      setErr(e?.message ?? "Submit failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 className="h2">Application</h1>
        {err && <div className="alert alert-err">{err}</div>}
        {!app && <p>Loading…</p>}
        {app && (
          <div className="card">
            <p>Status: <strong>{app.status}</strong></p>
            {app.submitted_at && <p>Submitted at: {app.submitted_at}</p>}
            {app.license_number && <p>License #: {app.license_number}</p>}
            {app.license_expires_at && <p>Expires: {app.license_expires_at}</p>}
            {app.status === "ready" && (
              <button className="btn btn-primary" onClick={submit} disabled={busy}>
                {busy ? "Submitting…" : "Mark as submitted to TDLR"}
              </button>
            )}
            {app.status === "draft" && (
              <div className="alert alert-warn">
                Your application isn't ready yet. Complete the eligibility wizard first.
                <div style={{ marginTop: 8 }}>
                  <a className="btn btn-primary" href="/eligibility">Open eligibility</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
