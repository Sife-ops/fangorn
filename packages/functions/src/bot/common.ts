import fetch, { RequestInit, Response } from "node-fetch";
import { Config } from "sst/node/config";
import { UserEntityType } from "@fangorn/core/db/entity";
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

export const onboardUser = async (user: UserEntityType & { id: string }) => {
  return model.entities.UserEntity.get({ userId: user.id })
    .go()
    .then((e) => e.data)
    .then(async (u) => {
      if (!u) {
        await model.entities.UserEntity.create({
          userId: user.id,
          username: user.username,
          discriminator: user.discriminator,
          avatar: user.avatar || "",
        }).go();
        return;
      }

      if (
        u.avatar !== user.avatar ||
        u.discriminator !== user.discriminator ||
        u.username !== user.username
      ) {
        await model.entities.UserEntity.update({
          userId: u.userId,
        })
          .set({
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
          })
          .go();
      }
    });
};
