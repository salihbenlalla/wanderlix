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
    })
  );
  return (
    <div
      class="instagram-media"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <iframe
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          margin: "1px",
          maxWidth: "550px",
          padding: 0,
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          // width: "99.375%",
          // width: "-webkit-calc(100% - 2px)",
          // width: "calc(100% - 2px)",
          width: 400,
          height: 608,
        }}
        src={`https://www.instagram.com/p/${props.postId}/embed/`}
        width="400"
        height={state.height || 0}
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        title="Embeded instagram post"
        sandbox=""
      />
    </div>
  );
});

export default InstagramEmbed;
