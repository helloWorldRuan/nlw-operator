export function getScoreColor(score: number): string {
  if (score < 4) return "var(--color-accent-red)";
  if (score < 7) return "var(--color-accent-amber)";
  return "var(--color-accent-green)";
}

export function getScoreColorHex(score: number): string {
  if (score < 4) return "#EF4444";
  if (score < 7) return "#F59E0B";
  return "#10B981";
}

export function getVerdictBadgeColor(
  verdict: string,
): "critical" | "warning" | "good" {
  if (
    verdict.includes("critical") ||
    verdict.includes("needs") ||
    verdict.includes("terrible") ||
    verdict.includes("failure")
  ) {
    return "critical";
  }
  if (
    verdict.includes("warning") ||
    verdict.includes("could") ||
    verdict.includes("improvement")
  ) {
    return "warning";
  }
  return "good";
}
