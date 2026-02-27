export function truncateText(
  text: string | undefined,
  maxLength: number
) {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace === -1) return truncated + "...";

  return truncated.slice(0, lastSpace) + "...";
}