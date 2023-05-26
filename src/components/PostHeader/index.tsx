import { component$, useStyles$ } from "@builder.io/qwik";
import { v4 as uuidv4 } from "uuid";
import { Image } from "qwik-image";
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
      //   style={{ backgroundImage: `url(${props.image})` }}
      //   style={{
      //     backgroundImage: `url(/images/the-essential-things-to-do-riquewihr.webp)`,
      //   }}
      //   style={{
      //     background: `linear-gradient(to top, #fe4f70 0%, #ffa387 100%)`,
      //   }}
    >
      <div class="post-header-image">
        {/* <img src={props.image} /> */}
        <div class="post-header-overlay" />
        <Image
          layout="fullWidth"
          objectFit="cover"
          //   aspectRatio={16 / 9}
          width={1280}
          height={600}
          alt="alt text"
          placeholder="#e6e6e6"
          src={props.image}
          loading="eager"
        />
      </div>
      <div class="container">
        <div class="cover-content">
          <nav class="breadcrumbs">
            <ol>
              {props.breadcrumbs.map((breadcrumb) => {
                return (
                  <li key={uuidv4()} class="breadcrumb">
                    <a href="#">{breadcrumb}</a>
                  </li>
                );
              })}
              <li key={uuidv4()} class="breadcrumb">
                <a href="#">{props.title}</a>
              </li>
            </ol>
          </nav>
          <div class="post-header">
            <h1>{props.title}</h1>
            <ul>
              <li>
                {/* <img src={props.authorAvatar} class="author-avatar" /> */}
                <div class="author-avatar">
                  <Image
                    layout="fullWidth"
                    objectFit="cover"
                    aspectRatio={32 / 32}
                    width={32}
                    height={32}
                    alt="alt text"
                    placeholder="#e6e6e6"
                    src={props.authorAvatar}
                    loading="lazy"
                  />
                </div>
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
