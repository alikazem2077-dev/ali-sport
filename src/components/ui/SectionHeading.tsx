interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
      <p className="max-w-2xl text-base leading-relaxed text-zinc-400">{subtitle}</p>
    </div>
  );
}
