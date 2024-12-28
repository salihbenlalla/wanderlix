import { component$, useOnWindow, $, useStore } from "@builder.io/qwik";

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
        }
      }
    }),
  );
  return (
    <div class="instagram-media flex flex-col items-center">
      <iframe
        class="m-px h-[608px] w-[400px] max-w-[550px] overflow-hidden rounded-[3px] border-0 bg-white p-0 shadow-lg"
        // frameBorder="0"
        // scrolling="no"
        src={`https://www.instagram.com/p/${props.postId}/embed/`}
        width="400"
        height={state.height || 0}
        allowTransparency={true}
        title="Embeded instagram post"
      />
    </div>
  );
});

export default InstagramEmbed;
