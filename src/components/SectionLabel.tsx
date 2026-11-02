/** "01 — Services" style label used at the top of each section. */
export function SectionLabel({
  index,
  children,
  tone = "dark",
}: {
  index: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-4 ${
        tone === "dark" ? "text-ash-500" : "text-ash-400"
      }`}
    >
      <span className="font-serif text-[0.9375rem] normal-case italic tracking-normal">
        {index}
      </span>
      <span
        aria-hidden
        className={`h-px w-8 ${tone === "dark" ? "bg-ash-300" : "bg-ash-600"}`}
      />
      <span>{children}</span>
    </p>
  );
}
