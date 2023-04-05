import { component$, Slot } from "@builder.io/qwik";
import ReadingBar from "~/components/ReadingBar";
import Header from "../components/header";

export default component$(() => {
  return (
    <>
      <main>
        <ReadingBar />
        <Header />
        {/* <section> */}
        <Slot />
        {/* </section> */}
      </main>
      <footer>
        <p>Copyright travel2.ml © 2022</p>
      </footer>
    </>
  );
});
