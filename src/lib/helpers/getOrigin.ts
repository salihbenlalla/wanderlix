export function getOrigin(): string {
  if (import.meta.env?.PUBLIC_CF_PAGES_URL) {
    return import.meta.env.PUBLIC_CF_PAGES_URL;
  }

  if (typeof process !== "undefined" && process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }

  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    return "http://localhost:5173";
  }

  return "https://wanderlix.com";
}
