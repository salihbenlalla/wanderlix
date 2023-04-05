import { $, component$, useOnWindow, useSignal } from "@builder.io/qwik";
import Header from "./header";

export default component$(() => {
  const isHidden = useSignal<boolean>(true);

  useOnWindow(
    "scroll",
    $(() => {
      if (window.scrollY <= 300) {
        isHidden.value = true;
      } else {
        isHidden.value = false;
      }
    })
  );

  return (
    <>
      <Header />
      <Header hidden={isHidden.value} sticky={true} />
    </>
  );
});
