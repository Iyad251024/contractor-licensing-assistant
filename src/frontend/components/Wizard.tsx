"use client";
import { useState } from "react";

export interface WizardQuestion {
  id: string;
  label: string;
  type: "boolean" | "number" | "string";
}

export function Wizard({
  questions,
  onSubmit,
}: {
  questions: WizardQuestion[];
  onSubmit: (answers: Record<string, unknown>) => Promise<void>;
}) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [submitting, setSubmitting] = useState(false);

  function set(id: string, val: unknown) {
    setAnswers((a) => ({ ...a, [id]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(answers);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="card">
      {questions.map((q) => (
        <div key={q.id}>
          <label className="label">{q.label}</label>
          {q.type === "boolean" ? (
            <select
              className="select"
              value={answers[q.id] === undefined ? "" : String(answers[q.id])}
              onChange={(e) => set(q.id, e.target.value === "true")}
            >
              <option value="" disabled>Select…</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : q.type === "number" ? (
            <input
              type="number"
              className="input"
              value={(answers[q.id] as number) ?? ""}
              onChange={(e) => set(q.id, Number(e.target.value))}
            />
          ) : (
            <input
              type="text"
              className="input"
              value={(answers[q.id] as string) ?? ""}
              onChange={(e) => set(q.id, e.target.value)}
            />
          )}
        </div>
      ))}
      <button className="btn btn-primary" style={{ marginTop: 20 }} disabled={submitting}>
        {submitting ? "Checking…" : "Check eligibility"}
      </button>
    </form>
  );
}
