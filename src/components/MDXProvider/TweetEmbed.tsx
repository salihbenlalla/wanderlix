import {
  component$,
  useRef,
  useClientEffect$,
  useStore,
} from "@builder.io/qwik";
// import script from "scriptjs";

declare global {
  interface Window {
    twttr: any;
  }
}

interface JSONObject {
  [k: string]: any;
}

interface TweetProps {
  tweetId: string;
  options?: JSONObject;
  /**
   * Placeholder while tweet is loading
   */
  placeholder?: string;
  /**
   * Function to execute after load, return html element
   */
  //   onLoad$?: (element: any) => void;
}

export const twitterWidgetJs = "https://platform.twitter.com/widgets.js";
export const methodName = "createTweet";

export const TweetEmbed = component$((props: TweetProps) => {
  const state = useStore({ isLoading: true, isComponentMounted: true });
  const ref = useRef();
  useClientEffect$(async () => {
    //   let isComponentMounted = true;
    const script = (await import("scriptjs")).default;
    script(twitterWidgetJs, "twitter-embed", () => {
      if (!window.twttr) {
        console.error("Failure to load window.twttr, aborting load");
        return;
      }
      if (state.isComponentMounted) {
        if (!window.twttr.widgets[methodName]) {
          console.error(
            `Method ${methodName} is not present anymore in twttr.widget api`
          );
          return;
        }

        window.twttr.widgets[methodName](
          props.tweetId,
          ref?.current,
          props.options
        ).then(() => {
          state.isLoading = false;
          // console.log("after loaded: ", element);
        });
      }
    });

    // cleaning up
    return () => {
      state.isComponentMounted = false;
    };
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      ref={ref}
    ></div>
  );
});

export default TweetEmbed;
