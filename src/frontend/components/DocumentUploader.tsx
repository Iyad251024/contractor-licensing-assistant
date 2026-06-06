"use client";
import { useState } from "react";
import { api } from "../lib/api.client";

const DOC_TYPES = [
  { key: "master_electrician_license", label: "Master Electrician license" },
  { key: "coi", label: "Certificate of Insurance" },
  { key: "ein_letter", label: "IRS EIN letter" },
  { key: "entity_formation", label: "Entity formation document" },
  { key: "assumed_name_cert", label: "Assumed Name Certificate (DBA)" },
];

export function DocumentUploader({ onUploaded }: { onUploaded?: () => void }) {
  const [docType, setDocType] = useState(DOC_TYPES[0].key);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      await api.uploadDocument(file, docType);
      onUploaded?.();
      e.target.value = "";
    } catch (ex: any) {
      setErr(ex?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <label className="label">Document type</label>
      <select className="select" value={docType} onChange={(e) => setDocType(e.target.value)}>
        {DOC_TYPES.map((d) => (
          <option key={d.key} value={d.key}>
            {d.label}
          </option>
        ))}
      </select>
      <label className="label">File</label>
      <input type="file" className="input" accept=".pdf,.jpg,.jpeg,.png" onChange={onFile} disabled={busy} />
      {busy && <p style={{ color: "var(--fg-muted)" }}>Uploading…</p>}
      {err && <div className="alert alert-err">{err}</div>}
    </div>
  );
}
