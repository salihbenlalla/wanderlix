import { component$, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

export type IframeProps = {
  src?: string;
  width?: string;
  height?: string;
};

const Iframe = component$((props: IframeProps) => {
  useStyles$(style);

  const { src, height, width } = props;

  if (typeof src !== "string" || src.length === 0) {
    return <></>;
  }

  return (
    <div class="iframe_container">
      <iframe
        src={src}
        height={height}
        width={width}
        loading="lazy"
        title="embeded content from another website"
      />
    </div>
  );
});

export default Iframe;
