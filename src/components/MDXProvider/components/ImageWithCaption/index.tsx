import {
  $,
  component$,
  Slot,
  //   useClientEffect$,
  //   useStore,
  useStyles$,
} from "@builder.io/qwik";
// import { Image } from "@unpic/qwik";
import {
  Image,
  type ImageTransformerProps,
  useImageProvider,
} from "qwik-image";
import styles from "./style.css?inline";

export type ImageWithCaptionProps = {
  imgSrc: string;
  imgWidth: string;
  imgHeight: string;
};

const ImageWithCaption = component$((props: ImageWithCaptionProps) => {
  useStyles$(styles);

  const imgHeight = Number(props.imgHeight);
  const imgWidth = Number(props.imgWidth);

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      // Here you can set your favourite image loaders service
      return `https://res.cloudinary.com/dlzx1x20u/image/upload/w_${width},h_${height},c_lfill,f_auto/v1684082099/travel2/${src}.webp`;
    }
  );

  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    resolutions: [640],
    imageTransformer$,
  });

  return (
    <div class="image_caption">
      <Image
        layout="fullWidth"
        objectFit="cover"
        aspectRatio={imgWidth / imgHeight}
        width={imgWidth}
        height={imgHeight}
        alt="alt text"
        placeholder="#e6e6e6"
        src={props.imgSrc}
        loading="lazy"
      />
      {/* {imgHeight && imgWidth ? (
        <div
          style={
            {
              // paddingBottom: `calc((${Number(imgHeight)}/${Number(
              //   imgWidth
              // )}) * 100%)`,
              // position: "relative",
            }
          }
        >
          <img
            src={props.imgSrc}
            loading="lazy"
            width={props.imgWidth}
            height={props.imgHeight}
            style={{
              height: "auto",
              width: "100%",
              //   position: "absolute",
              //   top: 0,
              //   bottom: 0,
              //   right: 0,
              //   left: 0,
              //   width: "100%",
              //   borderRadius: "5px",
              //   background:
              //     "#ddd url(/icomoon_svg/camera.svg) no-repeat center center",
            }}
            alt=""
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
      )} */}
      <Slot />
    </div>
  );
});

export default ImageWithCaption;
