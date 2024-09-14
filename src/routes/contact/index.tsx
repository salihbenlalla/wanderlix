import { component$, useStyles$ } from "@builder.io/qwik";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "~/components/ContactForm";
import GridHeader from "~/components/PostsGrid/GridHeader";
import styles from "./style.css?inline";
import ContactCard from "~/components/ContactCard";
import SquiglyLine from "~/components/SideBar/WidgetContainer/SquiglyLine";

const contactCardsData = [
  {
    icon: "phone2",
    contactMethod: "Phone",
    contactInfo: "Unavailable",
  },
  {
    icon: "mail5",
    contactMethod: "E-Mail",
    contactInfo: "Unavailable",
  },
  {
    icon: "map3",
    contactMethod: "Location",
    contactInfo: "California, USA",
  },
];

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <div class="sub-header">
        <GridHeader pageTitle="Contact" />
      </div>
      <div class="main-content">
        <section class="container contact-cards">
          {contactCardsData.map((props) => (
            <ContactCard key={uuidv4()} {...props} />
          ))}
        </section>
        <section class="container">
          <div class="spacer"></div>
          <div class="contact-page-section-header">
            <h3>Send Message</h3>
            <SquiglyLine />
          </div>
          <ContactForm />
        </section>
      </div>
    </>
  );
});
