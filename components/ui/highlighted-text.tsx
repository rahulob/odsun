export default function HighlightedText({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  const parts = text?.split(/(`[^`]+`)/g);

  return (
    <p className={className}>
      {parts?.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
