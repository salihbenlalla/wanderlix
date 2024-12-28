import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { type Author } from "~/lib/helpers/getAuthors";
import LinkIcon from "~/assets/icomoon_svg/link2.svg?component";
import FacebookIcon from "~/assets/icomoon_svg/facebook1.svg?component";
import InstagramIcon from "~/assets/icomoon_svg/instagram1.svg?component";
import LinkedInIcon from "~/assets/icomoon_svg/linkedin1.svg?component";
import XTwitterIcon from "~/assets/icomoon_svg/square-x-twitter.svg?component";
import YoutubeIcon from "~/assets/icomoon_svg/youtube1.svg?component";
import AuthorTooltip from "./AuthorTooltip";
import { ImageWithFallback } from "../ImageWithFallback";

type GridHeaderProps = Omit<Author, "avatarUrl">;

export default component$<GridHeaderProps>((props) => {
  useStyles$(styles);

  return (
    <div class="about-author-container">
      <div class="about-author-thumbnail">
        {/*<img src={props.imageUrl} width={100} height={100} />*/}
        <ImageWithFallback
          src={props.imageUrl}
          width={100}
          height={100}
          loading="lazy"
          alt={props.name}
        />
      </div>
      <div class="about-author-details">
        <p class="about-author-name">
          <a href={`/author/${props.url}/`}>{props.name}</a>
        </p>
        <p>{props.bio}</p>
        <ul>
          <li>
            <AuthorTooltip socialMedia="website">
              <span>
                <LinkIcon width={20} height={17} />
              </span>
            </AuthorTooltip>
          </li>
          <li>
            <AuthorTooltip socialMedia="facebook">
              <span>
                <FacebookIcon width={16} height={17} />
              </span>
            </AuthorTooltip>
          </li>
          <li>
            <AuthorTooltip socialMedia="instagram">
              <span>
                <InstagramIcon width={14} height={17} />
              </span>
            </AuthorTooltip>
          </li>
          <li>
            <AuthorTooltip socialMedia="linkedin">
              <span>
                <LinkedInIcon width={14} height={17} />
              </span>
            </AuthorTooltip>
          </li>
          <li>
            <AuthorTooltip socialMedia="X">
              <span>
                <XTwitterIcon width={16} height={17} />
              </span>
            </AuthorTooltip>
          </li>
          <li>
            <AuthorTooltip socialMedia="youtube">
              <span>
                <YoutubeIcon width={20} height={17} />
              </span>
            </AuthorTooltip>
          </li>
        </ul>
      </div>
    </div>
  );
});
