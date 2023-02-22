import { CommandHandler } from "../runner";

export const foo: CommandHandler = async (ctx) => {
  return {
    mutations: [
      ctx.followUp({
        content: "bar",
      }),
    ],
  };
};
