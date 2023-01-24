import { component$ } from "@builder.io/qwik";
import TweetEmbed from "~/components/MDXProvider/TweetEmbed";

const Tweet = component$(() => {
  return <TweetEmbed tweetId="839497713188208640" />;
});

export default Tweet;
