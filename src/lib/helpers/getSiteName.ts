export function getSiteName(): string {
  if (import.meta.env?.PUBLIC_SITE_NAME) {
    return import.meta.env?.PUBLIC_SITE_NAME;
  }

  if (typeof process !== "undefined" && process.env.PUBLIC_SITE_NAME) {
    return process.env.PUBLIC_SITE_NAME;
  }

  return "SITE_NAME";
}
