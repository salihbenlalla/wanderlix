import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const TitleStay = component$(() => {
  useStyles$(styles);
  return <></>;
  // TODO: Activate after signin up for stya22.com affiliate program
  // return (
  //   <div class="title_stay">
  //     <Slot />
  //   </div>
  // );
});

export default TitleStay;
