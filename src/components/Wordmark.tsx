/** BLACKLINE wordmark: letterspaced caps followed by the "line". */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-semibold uppercase tracking-[0.32em] ${className}`}
    >
      Blackline
      <span aria-hidden className="block h-px w-7 bg-current" />
    </span>
  );
}
