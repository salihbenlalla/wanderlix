import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

const SoundCloud = component$(() => {
  useStyles$(style);
  return (
    <div class="sound_cloud">
      <Slot />
    </div>
  );
});

export default SoundCloud;
