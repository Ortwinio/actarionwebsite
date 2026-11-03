export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`font-display text-[22px] font-extrabold tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>
      Act<span className="text-primary">AR</span>ion
    </span>
  );
}
