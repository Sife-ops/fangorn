import fetch, { RequestInit, Response } from "node-fetch";
import { Config } from "sst/node/config";

const apiUrl = "https://discord.com/api/v10"; // todo: move to constants

export const fetchDiscord = async (
  e: string,
  i: RequestInit
): Promise<Response> => {
  // todo: zod
  return fetch(`${apiUrl}${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Config.BOT_TOKEN}`,
    },
    ...i,
    body: JSON.stringify(i.body),
  });
};

export const ephemeralResponse = (content: string) => {
  return {
    type: 4,
    data: {
      flags: 64,
      content,
    },
  };
};
