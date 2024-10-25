/**
 * Get the site name
 * @param url - Optional URL object to extract port or other information.
 * @returns A string containing the full origin (protocol + domain + port if applicable).
 */
export function getSiteName(): string {
  if (import.meta.env?.PUBLIC_SITE_NAME) {
    return import.meta.env?.PUBLIC_SITE_NAME;
  }

  // if (typeof process !== "undefined" && process.env.PUBLIC_SITE_NAME) {
  //   return process.env.PUBLIC_SITE_NAME;
  // }

  return "SITE_NAME";
}
