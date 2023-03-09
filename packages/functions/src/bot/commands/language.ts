import { CommandHandler } from "../runner";

export const language: CommandHandler = async (ctx) => {
  return {
    mutations: [
      ctx.setShiritoriLanguage(),

      ctx.followUp({
        content: "language",
      }),
    ],
  };
};
