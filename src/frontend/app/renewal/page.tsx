"use client";
import { useEffect, useState } from "react";
import { api, getToken } from "../../lib/api.client";

export default function RenewalPage() {
  const [r, setR] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?next=/renewal";
      return;
    }
    api.renewalStatus().then((res) => setR(res.renewal)).catch((e) => setErr(e?.message));
  }, []);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 className="h2">Renewal</h1>
        {err && <div className="alert alert-err">{err}</div>}
        {!r && !err && <p>Loading…</p>}
        {r && !r.hasLicense && (
          <div className="card">
            <p>No active license on file yet. Once your application is approved and you set the license number and expiration, renewal tracking activates here.</p>
          </div>
        )}
        {r?.hasLicense && (
          <div className="card">
            <p>License: <strong>{r.licenseNumber}</strong></p>
            <p>Expires: <strong>{r.expiresAt}</strong></p>
            <p>Days remaining: <strong>{r.daysRemaining}</strong></p>
            {r.activeReminder && (
              <div className="alert alert-warn">
                Renewal reminder: license expires in {r.activeReminder} days or fewer.
                Renewal fee: ${r.renewalFee}.
              </div>
            )}
            {r.withinGrace && (
              <div className="alert alert-err">
                License is expired but within the grace period. Late fee: ${r.lateFee}.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
