export function getSiteName(): string {
  if (import.meta.env?.PUBLIC_SITE_NAME) {
    return import.meta.env.PUBLIC_SITE_NAME;
  }

  if (typeof process !== "undefined" && process.env.PUBLIC_SITE_NAME) {
    return process.env.PUBLIC_SITE_NAME;
  }

  if (typeof process !== "undefined" && process.env.CF_PAGES_URL) {
    const url = new URL(process.env.CF_PAGES_URL);
    const hostnameParts = url.hostname.split('.');
    if (hostnameParts.length > 0) {
      const siteName = hostnameParts[0];
      return siteName.charAt(0).toUpperCase() + siteName.slice(1);
    }
  }

  return "Wanderlix";
}
