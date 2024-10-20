import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Home from "../components/Home";
import { getDomainName } from "~/lib/helpers/getDomainName";

export default component$(() => {
  return <Home />;
});

export const head: DocumentHead = {
  title: `${getDomainName()} Home`,
};
