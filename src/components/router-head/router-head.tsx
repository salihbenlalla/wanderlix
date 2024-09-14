import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={`
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "${head.title}",
      "image": [
        "${head.links.find((obj) => obj.rel === "preload" && obj.as === "image")?.href}"
       ],
      "datePublished": "${head.meta.find((obj) => obj.property === "article:published_time")?.content}",
      "dateModified": "${head.meta.find((obj) => obj.property === "article:published_time")?.content}",
      "author": [{
          "@type": "Person",
          "name": "${head.meta.find((obj) => obj.name === "author")?.content}",
          "url": "/author/${head.meta.find((obj) => obj.name === "author")?.content}"
        }]
    }
    `}
      />
      {/* <link
        rel="preload"
        href="https://res.cloudinary.com/dlzx1x20u/image/upload/w_640,h_640,c_lfill,f_auto/v1684082099/travel2/fake-avatar_uwoskp.webp"
        as="image"
      />*/}
      {/* <link
        rel="preload"
        href="/images/the-essential-things-to-do-riquewihr_lung0t-1280x1922.webp"
        as="image"
        //@ts-ignore
        fetchpriority="high"
      /> */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap"
        rel="stylesheet"
      /> */}
      {/* <meta charSet="utf-8" /> */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
      {/* <link rel="stylesheet" href="/fonts/poppins/stylesheet.css" />
      <link href="/fonts/dmsans/stylesheet.css" rel="stylesheet" /> */}
      <meta property="og:site_name" content="travel2.ml" />
      {/* <meta name="twitter:site" content="@travel2" />
      <meta name="twitter:title" content="Travel2.ml" /> */}
      {/* <link
        rel="preload"
        href="/fonts/poppins/poppins-bold-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      <link
        rel="preload"
        href="/fonts/poppins/poppins-regular-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      <link
        rel="preload"
        href="/fonts/dmsans/dmsans-regular-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      <link
        rel="preload"
        href="/fonts/dmsans/dmsans-bold-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      <link
        rel="preload"
        href="/fonts/dmsans/dmsans-italic-webfont.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      /> */}
      {head.meta.map((m) => (
        <meta key={uuidv4()} {...m} />
      ))}
      {head.links.map((l) => (
        <link key={uuidv4()} {...l} />
      ))}
      {head.styles.map((s) => (
        <style key={uuidv4()} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      {head.scripts.map((s) => (
        <script key={s.key} {...s.props} dangerouslySetInnerHTML={s.script} />
      ))}
    </>
  );
});
