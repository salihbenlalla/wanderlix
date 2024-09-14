import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

type ElementProps = {
  [key: string]: any;
};

const ImageAd = component$((props: ElementProps) => {
  useStyles$(styles);

  const imgHeight = props.imgHeight;
  const imgWidth = props.imgWidth;

  if (!imgHeight || !imgWidth) {
    throw new Error(
      "ImageAd component: the image does not have a width or height"
    );
  }

  return (
    <div class="image_ad">
      <a href={props.aHref} target="_blank" rel="nofollow noopener noreferrer">
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
          width={imgWidth}
          height={imgHeight}
        />
        {/* {imgHeight && imgWidth ? (
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
              cursor: "pointer",
            }}
          />
        )} */}
      </a>
    </div>
  );
});

export default ImageAd;
