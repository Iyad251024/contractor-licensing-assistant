"use client";
import { useEffect, useState } from "react";
import { api, getToken } from "../../lib/api.client";
import { Wizard } from "../../components/Wizard";
import type { WizardQuestion } from "../../components/Wizard";

export default function EligibilityPage() {
  const [questions, setQuestions] = useState<WizardQuestion[]>([]);
  const [result, setResult] = useState<any>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?next=/eligibility";
      return;
    }
    api.eligibilityQuestions().then((r) => setQuestions(r.questions)).catch((e) => setErr(e?.message));
  }, []);

  async function onSubmit(answers: Record<string, unknown>) {
    try {
      const r = await api.checkEligibility(answers);
      setResult(r.result);
      setApplicationId(r.applicationId);
    } catch (e: any) {
      setErr(e?.message ?? "Failed");
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 className="h2">Eligibility check</h1>
        <p className="lead">Answer a few questions and we'll tell you whether you qualify under current TDLR rules.</p>

        {err && <div className="alert alert-err">{err}</div>}

        {!result && questions.length > 0 && <Wizard questions={questions} onSubmit={onSubmit} />}

        {result && (
          <div style={{ marginTop: 16 }}>
            <div className={`alert ${result.eligible ? "alert-ok" : "alert-err"}`}>
              {result.eligible
                ? "You appear eligible under current TDLR rules."
                : "You have blocking requirements remaining."}
            </div>
            {result.failures.length > 0 && (
              <div className="card">
                <h3 className="h3">Blocking issues</h3>
                <ul>
                  {result.failures.map((f: any) => (
                    <li key={f.ruleId}>{f.message}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.warnings.length > 0 && (
              <div className="card" style={{ marginTop: 12 }}>
                <h3 className="h3">Warnings</h3>
                <ul>
                  {result.warnings.map((w: any) => (
                    <li key={w.ruleId}>{w.message}</li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {result.eligible && applicationId && (
                <a className="btn btn-primary" href="/roadmap">Generate my roadmap</a>
              )}
              <a className="btn btn-ghost" href="/dashboard">Back to dashboard</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
