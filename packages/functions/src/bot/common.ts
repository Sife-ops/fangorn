import fetch, { RequestInit, Response } from "node-fetch";
import { Config } from "sst/node/config";
import { WordEntityType } from "@fangorn/core/db/entity";
import { model } from "@fangorn/core/db";

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

export const getRecentWords = async (
  shiritoriId: string
): Promise<WordEntityType[]> => {
  return model.entities.WordEntity.query
    .shiritori_({ shiritoriId })
    .go({ order: "desc", limit: 100 })
    .then((result) => result.data);
};

export const getShiri = (s: string) => {
  const shiri = s[s.length - 1];
  switch (shiri) {
    case "ゃ":
      return "や";
    case "ゅ":
      return "ゆ";
    case "ょ":
      return "よ";
    default:
      return shiri;
  }
};
