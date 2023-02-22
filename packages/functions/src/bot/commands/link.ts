import { CommandHandler } from "../runner";
import { Config } from "sst/node/config";
import { StaticSite } from "sst/node/site";
import { sign } from "jsonwebtoken";

export const link: CommandHandler = async (ctx) => {
  const token = sign({ userId: ctx.getUserId() }, Config.WEB_TOKEN_SECRET);

  console.log(Config.STAGE);

  const baseUrl = Config.STAGE.includes("local")
    ? "http://localhost:5173"
    : StaticSite.site.url;

  return {
    mutations: [
      ctx.followUp({
        embeds: [
          {
            title: "URL",
            description: `don't share links`,
            url: `${baseUrl}?t=${token}`,
            // color: 0xff0000,
          },
        ],
      }),
    ],
  };
};
