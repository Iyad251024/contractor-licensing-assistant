"use client";
import { useEffect, useState } from "react";
import { api, getToken } from "../../lib/api.client";
import { DocumentUploader } from "../../components/DocumentUploader";
import { config } from "../../lib/config";

export default function DocumentsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function refresh() {
    try {
      const r = await api.listDocuments();
      setDocs(r.documents);
    } catch (e: any) {
      setErr(e?.message ?? "Failed");
    }
  }

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?next=/documents";
      return;
    }
    refresh();
  }, []);

  async function del(id: string) {
    if (!confirm("Delete this document?")) return;
    await api.deleteDocument(id);
    refresh();
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <h1 className="h2">Documents</h1>
        {err && <div className="alert alert-err">{err}</div>}
        <div style={{ marginTop: 16 }}>
          <DocumentUploader onUploaded={refresh} />
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 className="h3">Your uploads</h3>
          {docs.length === 0 && <p style={{ color: "var(--fg-muted)" }}>No documents yet.</p>}
          <ul className="checklist">
            {docs.map((d) => (
              <li key={d.id}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{d.filename}</div>
                  <div style={{ color: "var(--fg-muted)", fontSize: 14 }}>
                    {d.doc_type} · {(d.size_bytes / 1024).toFixed(0)} KB
                  </div>
                </div>
                <a
                  className="btn btn-ghost"
                  href={`${config.apiUrl}/api/documents/${d.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
                <button className="btn btn-ghost" onClick={() => del(d.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
