import {
  component$,
  Slot,
  //   useClientEffect$,
  //   useStore,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

export type ImageWithCaptionProps = {
  imgSrc: string;
  imgWidth: string;
  imgHeight: string;
};

const ImageWithCaption = component$((props: ImageWithCaptionProps) => {
  useStyles$(styles);

  const imgHeight = props.imgHeight;
  const imgWidth = props.imgWidth;

  return (
    <div class="image_caption">
      {imgHeight && imgWidth ? (
        <div
          style={{
            paddingBottom: `calc((${Number(imgHeight)}/${Number(
              imgWidth
            )}) * 100%)`,
            position: "relative",
          }}
        >
          <img
            src={props.imgSrc}
            loading="lazy"
            alt=""
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: "100%",
              borderRadius: "5px",
              background:
                "#ddd url(/icomoon_svg/camera.svg) no-repeat center center",
            }}
          />
        </div>
      ) : (
        <img
          src={props.imgSrc}
          loading="lazy"
          alt=""
          style={{
            width: "100%",
            borderRadius: "5px",
            background:
              "#ddd url(/icomoon_svg/camera.svg) no-repeat center center",
          }}
        />
      )}
      <Slot />
    </div>
  );
});

export default ImageWithCaption;
