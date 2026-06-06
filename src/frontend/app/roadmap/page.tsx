"use client";
import { useEffect, useState } from "react";
import { api, getToken } from "../../lib/api.client";
import { Checklist } from "../../components/Checklist";
import type { ChecklistStep } from "../../components/Checklist";
import { ProgressBar } from "../../components/ProgressBar";

export default function RoadmapPage() {
  const [steps, setSteps] = useState<ChecklistStep[]>([]);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?next=/roadmap";
      return;
    }
    (async () => {
      try {
        const { application } = await api.getApplication();
        if (!application) {
          window.location.href = "/eligibility";
          return;
        }
        setApplicationId(application.id);
        let r = await api.getRoadmap(application.id);
        if (r.steps.length === 0) r = await api.generateRoadmap(application.id);
        setSteps(r.steps);
      } catch (e: any) {
        setErr(e?.message ?? "Failed");
      }
    })();
  }, []);

  async function update(id: string, status: ChecklistStep["status"]) {
    await api.updateStep(id, status);
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  async function regen() {
    if (!applicationId) return;
    const r = await api.generateRoadmap(applicationId);
    setSteps(r.steps);
  }

  const done = steps.filter((s) => s.status === "done").length;
  const pct = steps.length ? (done / steps.length) * 100 : 0;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <h1 className="h2">Your roadmap</h1>
        {err && <div className="alert alert-err">{err}</div>}
        {steps.length > 0 && (
          <>
            <p style={{ color: "var(--fg-muted)" }}>{done} of {steps.length} steps complete</p>
            <ProgressBar pct={pct} />
            <div style={{ marginTop: 20 }}>
              <Checklist steps={steps} onUpdate={update} />
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={regen}>
              Regenerate roadmap
            </button>
          </>
        )}
      </div>
    </section>
  );
}
