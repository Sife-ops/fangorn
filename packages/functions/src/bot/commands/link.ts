import { CommandHandler } from "../runner";
import { Config } from "sst/node/config";
import { StaticSite } from "sst/node/site";

export const link: CommandHandler = async (ctx) => {
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
            url: `${baseUrl}/?t=${await ctx.getToken()}`,
            // color: 0xff0000,
          },
        ],
      }),
    ],
  };
};
