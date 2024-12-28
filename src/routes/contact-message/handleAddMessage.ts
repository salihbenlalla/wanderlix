import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type RequestEvent } from "@builder.io/qwik-city";
import { type ContactFormInput } from "~/components/ContactForm";
import { getDB } from "~/lib/helpers/getDB";
import dateFormat from "dateformat";

export type AddMessageReturnValue = {
  failed: boolean;
  message: string;
};

export const handleAddMessage = async (
  message: ContactFormInput,
  ev: RequestEvent<PlatformCloudflarePages>
  // postSlug: string | undefined
): Promise<AddMessageReturnValue> => {
  const DB = await getDB(ev);

  if (!DB) {
    console.error("Error handleAddMessage: No database!");

    return {
      failed: true,
      message: "Internal server error.",
    };
  }

  const date = dateFormat(Date.now(), "isoUtcDateTime");

  const addQuery = `
INSERT INTO Messages (senderName, email, subject, messageText, messageDate)
VALUES (?, ?, ?, ?, ?);
`;

  try {
    const {
      success,
      meta: meta1,
      error,
    } = await DB.prepare(addQuery)
      .bind(
        message.senderName,
        message.email,
        message.subject,
        message.messageText,
        date
      )
      .all();

    if (success && meta1.changes >= 1 && !error) {
      return {
        failed: false,
        message: "Message added seccessfuly.",
      };
    } else {
      console.log(
        "Error handleAddComment: no success or meta.changes < 1, error: ",
        error
      );

      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  } catch (error) {
    console.error(
      "Error handleAddComment: error while trying to add message to database: ",
      error
    );

    return {
      failed: true,
      message: "Internal server error.",
    };
  }
};
