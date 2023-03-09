import { CommandHandler } from "../runner";

export const channel: CommandHandler = async (ctx) => {
  return {
    mutations: [
      ctx.setShiritoriChannel(),
      ctx.followUp({
        content: "channel",
      }),
    ],
  };
};
