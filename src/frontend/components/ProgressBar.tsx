export function ProgressBar({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  return (
    <div className="progress" aria-label={`progress ${clamped}%`}>
      <span style={{ width: `${clamped}%` }} />
    </div>
  );
}
