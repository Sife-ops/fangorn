import * as cheerio from "cheerio";
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

export const gooJisho = async (url: string) => {
  return fetch(url, { method: "GET" })
    .then((e) => e.text())
    .then((e) => cheerio.load(e))
    .then((e) => e(".yomi").text());
};

export const getShiri = (s: string) => {
  const shiri = s[s.length - 1];
  switch (shiri) {
    case "ゃ":
      return "や";
    case "ャ":
      return "ヤ";
    case "ゅ":
      return "ゆ";
    case "ュ":
      return "ユ";
    case "ょ":
      return "よ";
    case "ョ":
      return "ヨ";
    // case "ん":
    // case "ン":
    //   return s[s.length - 2];
    default:
      return shiri;
  }
};
