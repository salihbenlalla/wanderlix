import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

interface GridHeaderProps {
  pageTitle: string | undefined;
}

export default component$<GridHeaderProps>(({ pageTitle }) => {
  useStyles$(styles);

  return (
    <section class="posts-grid-header">
      <h1 class="posts-grid-header-title">
        {pageTitle ?? "Oops, something went wrong!"}
      </h1>
    </section>
  );
});
