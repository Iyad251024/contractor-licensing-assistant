export interface Document {
  id: string;
  user_id: string;
  application_id: string | null;
  doc_type: string;
  r2_key: string;
  filename: string;
  mime: string;
  size_bytes: number;
  uploaded_at: string;
}
