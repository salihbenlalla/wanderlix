import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Home from "../components/Home";

export default component$(() => {
  return <Home />;
});

export const head: DocumentHead = {
  title: "travel2.ml Home",
};
