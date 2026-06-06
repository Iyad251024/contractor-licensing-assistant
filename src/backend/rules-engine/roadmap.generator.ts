import type { RulesDoc, RoadmapStepDef } from "./types";

export interface GeneratedStep {
  step_key: string;
  title: string;
  description: string;
  order_index: number;
}

export function generateRoadmap(
  rules: RulesDoc,
  answers: Record<string, unknown>,
): GeneratedStep[] {
  const included = rules.roadmap.filter((s: RoadmapStepDef) => {
    if (!s.skipIf) return true;
    return answers[s.skipIf.field] !== s.skipIf.equals;
  });

  return included
    .sort((a, b) => a.order - b.order)
    .map((s, i) => ({
      step_key: s.key,
      title: s.title,
      description: s.description,
      order_index: i + 1,
    }));
}

export function requiredDocuments(rules: RulesDoc, answers: Record<string, unknown>) {
  return rules.requiredDocuments.filter((d) => {
    if (!d.conditional) return true;
    return answers[d.conditional.field] === d.conditional.equals;
  });
}
