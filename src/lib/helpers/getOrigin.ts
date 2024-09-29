/**
 * Get the current origin (domain and port) based on the environment (Cloudflare, local dev, local production).
 * @param url - Optional URL object to extract port or other information.
 * @returns A string containing the full origin (protocol + domain + port if applicable).
 */
export function getOrigin(url: URL): string | undefined {

  if (process.env.NODE_ENV === 'development') {
    // Local development (using Vite, get port dynamically)
    const port = import.meta.env.VITE_PORT || url?.port || 3000; // Default to 3000 if no port is specified
    return `http://localhost:${port}`;
  } else {
    return import.meta.env.PUBLIC_CF_PAGES_URL;
  }
 //  if (import.meta.env.CF_PAGES_URL){
 //    return import.meta.env.CF_PAGES_URL;
 //  } else if (process.env.CF_PAGES_URL) {
 //    return process.env.CF_PAGES_URL;
 //  } else {
 // return import.meta.env.PUBLIC_CF_PAGES_URL;
 //  }

  // let origin = "http://localhost:5173"; // Fallback origin
  // if (process.env.CF_PAGES_URL) {
  //   // Cloudflare Pages deployment
  //   origin = process.env.CF_PAGES_URL;
  // } else if (process.env.NODE_ENV === 'development') {
  //   // Local development (using Vite, get port dynamically)
  //   const port = import.meta.env.VITE_PORT || url?.port || 3000; // Default to 3000 if no port is specified
  //   origin = `http://localhost:${port}`;
  // } else if (process.env.NODE_ENV === 'production') {
  //   // Local production (after build, served via 'serve')
  //   const port = url?.port || 3000; // You can extract port dynamically if needed
  //   origin = `http://localhost:${port}`;
  // }
  //
  // return origin;
}
