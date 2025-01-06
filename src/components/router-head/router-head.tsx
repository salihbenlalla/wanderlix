import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";
import { getSiteName } from "~/lib/helpers/getSiteName";
// import { QwikPartytown } from "../partytown/partytown";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title}</title>

      <meta charSet="utf-8" />
      {/* <QwikPartytown forward={["gtag", "dataLayer.push"]} />
      <script
        async
        type="text/partytown"
        src="https://www.googletagmanager.com/gtag/js?id=G-HDJ6SCBSHE"
      />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HDJ6SCBSHE');
        `}
      /> */}
      <meta name="theme-color" content="#01a0c6" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="yandex-verification" content="04dc76ad5a846fd9" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={getSiteName()} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* <script */}
      {/*   type="application/ld+json" */}
      {/*   dangerouslySetInnerHTML={` */}
      {/*     { */}
      {/*       "@context": "https://schema.org", */}
      {/*       "@type": "NewsArticle", */}
      {/*       "headline": "${head.title}", */}
      {/*       "image": [ */}
      {/*         "${head.links.find((obj) => obj.rel === "preload" && obj.as === "image")?.href}" */}
      {/*        ], */}
      {/*       "datePublished": "${head.meta.find((obj) => obj.property === "article:published_time")?.content}", */}
      {/*       "dateModified": "${head.meta.find((obj) => obj.property === "article:published_time")?.content}", */}
      {/*       "author": [{ */}
      {/*           "@type": "Person", */}
      {/*           "name": "${head.meta.find((obj) => obj.name === "author")?.content}", */}
      {/*           "url": "/author/${head.meta.find((obj) => obj.name === "author")?.content}" */}
      {/*         }] */}
      {/*     } */}
      {/*   `} */}
      {/* /> */}
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
