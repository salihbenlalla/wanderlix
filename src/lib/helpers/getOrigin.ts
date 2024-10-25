/**
 * Get the current origin (domain and port) based on the environment (Cloudflare, local dev, local production).
 * @param url - Optional URL object to extract port or other information.
 * @returns A string containing the full origin (protocol + domain + port if applicable).
 */
export function getOrigin(): string {
  if (import.meta.env?.PUBLIC_CF_PAGES_URL) {
    return import.meta.env?.PUBLIC_CF_PAGES_URL;
  }

  // if (typeof process !== "undefined" && process.env.PUBLIC_CF_PAGES_URL) {
  //   return process.env.PUBLIC_CF_PAGES_URL;
  // }

  return "SITE_URL";
}
