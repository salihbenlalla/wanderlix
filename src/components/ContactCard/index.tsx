import { component$, useStyles$ } from "@builder.io/qwik";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";
import styles from "./style.css?inline";

interface ContactCardProps {
  icon: string;
  contactMethod: string;
  contactInfo: string;
}

export default component$<ContactCardProps>((props) => {
  useStyles$(styles);

  const SVGIcon = props.icon ? svgxImport(props.icon) : "";

  return (
    <div class="contact-card-container">
      <div class="contact-card">
        <div class="contact-card-icon-container">
          {SVGIcon && <SVGIcon width="26" height="26" fill="#ffffff" />}
        </div>
        <div class="contact-card-details">
          <h3 class="contact-card-method">{props.contactMethod}</h3>
          <p class="contact-card-info">{props.contactInfo}</p>
        </div>
      </div>
    </div>
  );
});
