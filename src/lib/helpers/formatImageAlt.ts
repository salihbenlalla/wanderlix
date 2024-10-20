export function formatImageAlt(path: string): string {
  // Extract the part after the last "/"
  const fileName = path.substring(path.lastIndexOf('/') + 1);

  // Remove the extension and replace dashes with spaces
  const formattedName = fileName.replace('.webp', '').replace(/-/g, ' ');

  return formattedName;
}
