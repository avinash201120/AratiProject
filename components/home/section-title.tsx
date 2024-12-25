interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
  subtitleClassName?: string;
}

export function SectionTitle({
  title,
  subtitle,
  className = "text-[#1e2749]",
  subtitleClassName = "text-gray-600",
}: SectionTitleProps) {
  return (
    <>
      <h2 className={`text-4xl font-bold text-center mb-4 ${className}`}>
        {title}
      </h2>
      <p className={`text-center mb-12 ${subtitleClassName}`}>{subtitle}</p>
    </>
  );
}
