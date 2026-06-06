export type RuleOperator = "equals" | "neq" | "gte" | "lte" | "in";

export interface EligibilityRule {
  id: string;
  type: "required" | "warning";
  field: string;
  operator: RuleOperator;
  value: unknown;
  failMessage: string;
}

export interface RoadmapStepDef {
  key: string;
  title: string;
  description: string;
  order: number;
  skipIf?: { field: string; equals: unknown };
}

export interface RequiredDocumentDef {
  key: string;
  label: string;
  accepts: string[];
  maxMb: number;
  conditional?: { field: string; equals: unknown };
}

export interface RulesDoc {
  jurisdiction: string;
  name: string;
  authority: string;
  version: string;
  fees: { application: number; renewal: number; lateRenewal: number; currency: string };
  renewal: { termMonths: number; reminderDaysBefore: number[]; graceDays: number };
  eligibility: { rules: EligibilityRule[] };
  requiredDocuments: RequiredDocumentDef[];
  roadmap: RoadmapStepDef[];
  wizardQuestions: { id: string; label: string; type: string }[];
}

export interface EligibilityFailure {
  ruleId: string;
  severity: "required" | "warning";
  message: string;
}

export interface EligibilityResult {
  eligible: boolean;
  failures: EligibilityFailure[];
  warnings: EligibilityFailure[];
  evaluatedAt: string;
}
