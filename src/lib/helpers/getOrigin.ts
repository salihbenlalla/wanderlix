export function getOrigin(): string {
  // if (import.meta.env.ORIGIN) {
  //   import.meta.env.ORIGIN;
  // }

  if (typeof process !== "undefined" && process.env.CF_ENV === "production" && process.env.ORIGIN) {
    return process.env.ORIGIN;
  }

  if (typeof process !== "undefined" && process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }

  if (
    typeof process !== "undefined" &&
    process.env.NODE_ENV === "development"
  ) {
    return "http://localhost:5173";
  }

  return "https://wanderlix.com";
}
