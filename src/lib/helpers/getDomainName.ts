export function getDomainName(): string {

  if (import.meta.env?.PUBLIC_SITE_DOMAIN_NAME) {
    return import.meta.env?.PUBLIC_SITE_DOMAIN_NAME;
  }

  if (typeof process !== "undefined" && process.env.PUBLIC_SITE_DOMAIN_NAME) {
    return process.env.PUBLIC_SITE_DOMAIN_NAME;
  }

  return "SITE_DOMAIN_NAME";
}
