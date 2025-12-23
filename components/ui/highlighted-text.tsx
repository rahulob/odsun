type HighlightedTextProps = {
  text?: string;
  className?: string;
};

export default function HighlightedText({
  text = "",
  className,
}: HighlightedTextProps) {
  // Split into lines first so "\n" becomes actual line breaks
  const lines = text.split("\n");

  const renderSegment = (segment: string, keyPrefix: string) => {
    // Handle inline code first: `code`
    const codeParts = segment.split(/(`[^`]+`)/g);

    return codeParts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={`${keyPrefix}-code-${i}`}
            className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Now handle bold inside non-code text: **bold**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);

      return boldParts.map((bp, j) => {
        if (bp.startsWith("**") && bp.endsWith("**")) {
          return (
            <strong key={`${keyPrefix}-bold-${i}-${j}`}>
              {bp.slice(2, -2)}
            </strong>
          );
        }
        return <span key={`${keyPrefix}-text-${i}-${j}`}>{bp}</span>;
      });
    });
  };

  return (
    <p className={className}>
      {lines.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`}>
          {renderSegment(line, `line-${lineIndex}`)}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}
