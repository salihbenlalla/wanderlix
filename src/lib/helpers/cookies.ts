import { isBrowser } from "@builder.io/qwik/build";

export const getCookie = (cname: string): string | undefined => {
  if (isBrowser) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return undefined;
};

export function setCookie(
  name: string,
  value: string,
  options?: CookieOptions
): void {
  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (options) {
    if (options.expires) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 1000 * 60 * 60 * 24);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += `; secure`;
    }

    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }
  }

  document.cookie = cookieString;
}

export const deleteCookie = (name: string): void => {
  if (isBrowser) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0; path=/;`;
  }
};

interface CookieOptions {
  expires?: number; // Expiry time in seconds (optional)
  path?: string; // Path for which the cookie is valid (optional)
  domain?: string; // Domain for which the cookie is valid (optional)
  secure?: boolean; // Whether the cookie should only be transmitted over HTTPS (optional)
  sameSite?: "Strict" | "Lax" | "None"; // Controls cross-site cookie behavior (optional)
}
