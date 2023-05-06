import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import Header from "./header";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const isHidden = useSignal<boolean>(true);
  const isSmall = useSignal<boolean>(false);

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

  const location = useLocation();
  useTask$(() => {
    if (location.url.pathname === "/") {
      isSmall.value = true;
    }
  });

  return (
    <>
      <Header isSmall={isSmall.value} />
      <Header isSmall={isSmall.value} hidden={isHidden.value} sticky={true} />
    </>
  );
});
