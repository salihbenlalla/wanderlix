import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const canonicalUrl =
    head.links.find((obj) => obj.rel === "canonical")?.href ?? "#";

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap"
        rel="stylesheet"
      /> */}
      <meta charSet="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="/fonts/poppins/stylesheet.css" />
      <link href="/fonts/dmsans/stylesheet.css" rel="stylesheet" />

      <meta property="og:site_name" content="travel2.ml" />
      {/* <meta name="twitter:site" content="@travel2" />
      <meta name="twitter:title" content="Travel2.ml" /> */}

      {head.meta.map((m) => (
        <meta key={uuidv4()} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={uuidv4()} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={uuidv4()} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
