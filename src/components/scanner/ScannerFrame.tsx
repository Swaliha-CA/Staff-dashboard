export function ScannerFrame() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="absolute inset-6 rounded-2xl border border-white/10" aria-hidden="true" />
      {/* corners */}
      {[
        "top-6 left-6 border-t-2 border-l-2 rounded-tl-xl",
        "top-6 right-6 border-t-2 border-r-2 rounded-tr-xl",
        "bottom-6 left-6 border-b-2 border-l-2 rounded-bl-xl",
        "bottom-6 right-6 border-b-2 border-r-2 rounded-br-xl",
      ].map((cls) => (
        <span
          key={cls}
          className={`absolute h-10 w-10 border-primary ${cls}`}
          aria-hidden="true"
        />
      ))}
      {/* scanner line */}
      <div className="absolute inset-x-10 top-10 h-px animate-[scan_2.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_var(--color-primary)]" />
      <style>{`@keyframes scan { 0%,100% { transform: translateY(0) } 50% { transform: translateY(220px) } }`}</style>
      <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/60">
        Align QR code within the frame
      </p>
    </div>
  );
}
