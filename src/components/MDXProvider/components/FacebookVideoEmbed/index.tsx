import { component$, useVisibleTask$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export interface FacebookVideoEmbedProps {
  videoUrl?: string;
}

export const facebookSDK =
  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";

const FacebookVideoEmbed = component$((props: FacebookVideoEmbedProps) => {
  useStyles$(styles);
  useVisibleTask$(async () => {
    const script = (await import("scriptjs")).default;
    script(facebookSDK, "facebook-sdk");
  });

  return (
    <div class="fb-video-container">
      <div class="fb-video" data-href={props.videoUrl} data-width="500"></div>
    </div>
  );
});

export default FacebookVideoEmbed;
