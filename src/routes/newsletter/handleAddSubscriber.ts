import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type RequestEvent } from "@builder.io/qwik-city";
import { getDB } from "~/lib/helpers/getDB";
import dateFormat from "dateformat";
import { type NewsletterFormInput } from "~/components/SideBar/NewsletterWidget";

export type AddSubscriberReturnValue = {
  failed: boolean;
  message: string;
};

export const handleAddSubscriber = async (
  subscriber: NewsletterFormInput,
  ev: RequestEvent<PlatformCloudflarePages>
): Promise<AddSubscriberReturnValue> => {
  const DB = await getDB(ev);

  if (!DB) {
    console.error("Error handleAddSubscriber: No database!");

    return {
      failed: true,
      message: "Internal server error.",
    };
  }

  const date = dateFormat(Date.now(), "isoUtcDateTime");

  const addQuery = `
INSERT INTO Newsletter (email, subscriptionDate)
VALUES (?, ?);
`;

  try {
    const {
      success,
      meta: meta1,
      error,
    } = await DB.prepare(addQuery).bind(subscriber.email, date).all();

    if (success && meta1.changes >= 1 && !error) {
      return {
        failed: false,
        message: "thank you for your subscription to our newsletter.",
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
  } catch (error: any) {
    console.log(
      "Error handleAddComment: error while trying to add subscriber to database: ",
      error
    );

    if (
      error?.cause?.toString().trim() ===
      "Error: Error: SqliteError: UNIQUE constraint failed: Newsletter.email"
    ) {
      return {
        failed: true,
        message: "You have already subscribed!",
      };
    }
    return {
      failed: true,
      message: "Internal server error.",
    };
  }
};
