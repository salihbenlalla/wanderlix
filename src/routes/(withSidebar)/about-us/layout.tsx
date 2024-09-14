import { component$, Slot } from "@builder.io/qwik";
import GridHeader from "~/components/PostsGrid/GridHeader";
// import styles from "./style.css?inline";

export default component$(() => {
  //   useStyles$(styles);

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle="Privacy Policy" />
      </div>
      <div class="page-content">
        <Slot />
      </div>
    </>
  );
});
