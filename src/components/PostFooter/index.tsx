import { component$, useStyles$ } from "@builder.io/qwik";
import FacebookIcon from "~/assets/icomoon_svg/facebook1.svg?component";
import TelegramIcon from "~/assets/icomoon_svg/telegram1.svg?component";
import LinkedInIcon from "~/assets/icomoon_svg/linkedin1.svg?component";
import XTwitterIcon from "~/assets/icomoon_svg/square-x-twitter.svg?component";
import PinterestIcon from "~/assets/icomoon_svg/pinterest1.svg?component";
import EnvelopeIcon from "~/assets/icomoon_svg/envelope1.svg?component";
import styles from "./style.css?inline";
import SingleTag from "../SideBar/TagCloudsWidget/SingleTag";
import { useLocation } from "@salihbenlalla/qwik-city";

interface PostFooterProps {
  tagName: string;
  tagUrl: string;
  postTitle: string;
  postDescription: string;
  postImage: string;
}

export default component$<PostFooterProps>((props) => {
  useStyles$(styles);

  const loc = useLocation();
  const postHref = loc.url.href;

  return (
    <footer class="post-footer">
      <div class="post-bottom">
        <div class="post-footer-socials">
          <div class="share-post-text">Share this:</div>
          <div class="share-post-icons">
            <ul>
              <li>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${postHref}`}
                  target="_blank"
                  aria-label="Share on facebook"
                >
                  <FacebookIcon width={16} height={17} />
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?url=${postHref}&text=${props.postTitle}`}
                  target="_blank"
                  aria-label="Share on X"
                >
                  <XTwitterIcon width={17} height={17} />
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${postHref}&title=${props.postTitle}`}
                  target="_blank"
                  aria-label="Share on Linkedin"
                >
                  <LinkedInIcon width={14} height={17} />
                </a>
              </li>
              <li>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${postHref}&media=${props.postImage}&description=${props.postDescription}`}
                  target="_blank"
                  aria-label="Share on Pinterest"
                >
                  <PinterestIcon width={16} height={17} />
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/share/url?url=${postHref}&text=${props.postTitle}`}
                  target="_blank"
                  aria-label="Send by Telegram"
                >
                  <TelegramIcon width={16} height={17} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:info@example.com?&subject=${props.postTitle}&cc=&bcc=&body=${postHref}`}
                  target="_blank"
                  aria-label="Send by Email"
                >
                  <EnvelopeIcon width={17} height={17} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="post-footer-tags">
          <SingleTag tagName={props.tagName} url={props.tagUrl} />
        </div>
      </div>
    </footer>
  );
});
