import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { ImageWithFallback } from "../ImageWithFallback";

export interface DestinationCardProps {
  country: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  param: string;
  post_count: number;
}

export default component$<DestinationCardProps>((props) => {
  useStyles$(styles);

  return (
    <a href={`/destination/${props.param}`} class="destination-card">
      <ImageWithFallback
        src={`/images/${320}/${Math.round(props.imageHeight / 4)}/${props.image}`}
        width={768}
        height={576}
        loading="lazy"
        alt={props.country}
      />
      <div class="destination-card-info">
        <span class="destination-card-title">{props.country}</span>
        <span class="destination-card-count">{props.post_count} posts</span>
      </div>
    </a>
  );
});
