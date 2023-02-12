import { component$, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

export type IframeProps = {
  src?: string;
  width?: string;
  height?: string;
};

const Iframe = component$((props: IframeProps) => {
  useStyles$(style);
  return (
    <div class="iframe_container">
      <iframe {...props} />;
    </div>
  );
});

export default Iframe;
