import { component$, useStyles$ } from "@builder.io/qwik";
import BubbleIcon from "~/assets/icomoon_svg/bubble2.svg";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";

interface PostHeaderProps {
  title: string;
  authorName: string;
  tagName: string;
  dateModified: string;
  image: string;
  authorAvatar: string;
}

export default component$<PostHeaderProps>((props) => {
  useStyles$(styles);

  return (
    <div class="post-header">
      <h1>{props.title}</h1>
      <ul>
        <li>
          <img src={props.authorAvatar} class="author-avatar" />
          <span>{props.authorName}</span>
        </li>
        <li>{props.tagName}</li>
        <li>{formatDate(props.dateModified)}</li>
        <li class="comment-count">
          <BubbleIcon viewbox="0 0 32 32" width="16" height="16" /> (0)
        </li>
      </ul>
      <div class="post-header-image">
        <img src={props.image} />
      </div>
    </div>
  );
});
