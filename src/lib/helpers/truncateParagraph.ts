export default function truncateParagraph(paragraph: string, minLength: number = 150, maxLength: number = 160): string {
  if (paragraph.length <= maxLength) {
    return paragraph;
  }

  // Find the point to truncate at maxLength without cutting off any word
  let truncated = paragraph.slice(0, maxLength + 1);

  // If the last character is not a space, find the last space before maxLength
  if (truncated[maxLength] !== ' ' && paragraph.length > maxLength) {
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex > minLength) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }
  }

  return truncated.trim() + '...';
}
