import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import BannerSection from "./BannerSection";

export default component$(() => {
  return (
    <>
      <BannerSection />
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
