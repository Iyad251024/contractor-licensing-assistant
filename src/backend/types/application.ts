export type ApplicationStatus =
  | "draft"
  | "ready"
  | "submitted"
  | "approved"
  | "rejected";

export interface WizardAnswers {
  hasMasterElectrician?: boolean;
  masterLicenseActive?: boolean;
  hasBusinessEntity?: boolean;
  hasEin?: boolean;
  liabilityCoverage?: number;
  usesDba?: boolean;
  hasFelonyConviction?: boolean;
  [k: string]: unknown;
}

export interface Application {
  id: string;
  user_id: string;
  jurisdiction: string;
  status: ApplicationStatus;
  eligibility_result: string | null;
  wizard_answers: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  license_number: string | null;
  license_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapStep {
  id: string;
  application_id: string;
  step_key: string;
  title: string;
  description: string;
  order_index: number;
  status: "pending" | "in_progress" | "done" | "blocked";
  due_date: string | null;
}
