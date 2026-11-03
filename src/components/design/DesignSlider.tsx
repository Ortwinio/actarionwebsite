'use client';

/** Range slider in the ROI design style (.rng thumb over a 4px track with blue fill). */
export function DesignSlider({
  id, min, max, step = 1, value, onChange, label,
}: { id: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void; label: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-11">
      <div className="pointer-events-none absolute left-0 right-0 top-[20px] h-1 rounded-full bg-line" aria-hidden="true">
        <div className="h-1 rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <input
        id={id}
        type="range"
        className="rng relative focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-primary-focus"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
