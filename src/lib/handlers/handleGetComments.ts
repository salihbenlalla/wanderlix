import { RequestEventLoader } from "@builder.io/qwik-city";
import { DB } from "./db";

export const handleGetComments = async (ev: RequestEventLoader) => {
  if (ev.platform.DB) {
    const { results } = await ev.platform.DB.prepare(
      "SELECT * FROM Comments"
    ).all();
    console.log("results: ", results);
    return results;
  }

  return DB.comments;
};
