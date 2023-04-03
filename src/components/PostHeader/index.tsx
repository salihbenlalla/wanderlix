import { component$, useStyles$ } from "@builder.io/qwik";
import { v4 as uuidv4 } from "uuid";
import BubbleIcon from "~/assets/icomoon_svg/bubble2.svg?component";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";

interface PostHeaderProps {
  title: string;
  authorName: string;
  tagName: string;
  dateModified: string;
  image: string;
  authorAvatar: string;
  breadcrumbs: string[];
}

export default component$<PostHeaderProps>((props) => {
  useStyles$(styles);

  return (
    <section
      class="post-cover"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div class="container">
        <div class="cover-content">
          <nav class="breadcrumbs">
            <ol>
              {props.breadcrumbs.map((breadcrumb) => {
                //   if (index === 0) {
                //     return (
                //       <li key={uuidv4()} class="breadcrumb-first">
                //         {breadcrumb}
                //       </li>
                //     );
                //   }
                //   if (index === props.breadcrumbs.length - 1) {
                //     return (
                //       <li key={uuidv4()} class="breadcrumb-last">
                //         {breadcrumb}
                //       </li>
                //     );
                //   }
                return (
                  <li key={uuidv4()} class="breadcrumb">
                    <a href="#">{breadcrumb}</a>
                  </li>
                );
              })}
            </ol>
          </nav>
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
            {/* <div class="post-header-image">
            <img src={props.image} />
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
});
