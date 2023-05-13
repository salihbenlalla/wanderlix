import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import style from "./style.css?inline";

export type IframeProps = {
  src?: string;
  width?: string;
  height?: string;
};

const Iframe = component$((props: IframeProps) => {
  const { src } = props;
  useStyles$(style);

  const srcSignal = useSignal<string | undefined>();

  useVisibleTask$(() => {
    srcSignal.value = src;
  });
  return (
    <div class="iframe_container">
      {/* <iframe src={srcSignal.value} {...rest} loading="lazy" /> */}
    </div>
  );
});

export default Iframe;
