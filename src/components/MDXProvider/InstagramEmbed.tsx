import { component$, useOnWindow, $, useStore } from "@builder.io/qwik";
import { cn } from "~/lib/helpers/cn";

interface InstagramEmbedProps {
  postId: string;
}

interface StoreState {
  height: number | null;
}

const InstagramEmbed = component$<InstagramEmbedProps>((props) => {
  const state = useStore<StoreState>({ height: null });
  useOnWindow(
    "message",
    $((message: any) => {
      if (!message.data) return;
      if (message.origin === "https://www.instagram.com") {
        const iFrameData = JSON.parse(message.data);

        if (iFrameData.type === "MEASURE") {
          const iFrameHeight = iFrameData.details.height;
          state.height = iFrameHeight;
          console.log("iframe height: ", iFrameHeight);
        }
      }
    }),
  );
  return (
    <div class="instagram-media flex flex-col items-center">
      <iframe
        class={cn(
          "m-px h-[618px] w-[400px] max-w-full overflow-hidden rounded-[3px] border-0 bg-white p-0 shadow-lg",
        )}
        src={`https://www.instagram.com/p/${props.postId}/embed/`}
        allowTransparency={true}
        title="Embeded instagram post"
        loading="lazy"
      />
    </div>
  );
});

export default InstagramEmbed;
