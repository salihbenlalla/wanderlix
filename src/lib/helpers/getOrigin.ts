export function getOrigin(): string {
  if (import.meta.env?.PUBLIC_CF_PAGES_URL) {
    return import.meta.env?.PUBLIC_CF_PAGES_URL;
  }

  if (typeof process !== "undefined" && process.env.PUBLIC_CF_PAGES_URL) {
    return process.env.PUBLIC_CF_PAGES_URL;
  }

  return "SITE_URL";
}
