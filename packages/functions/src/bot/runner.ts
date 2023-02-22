import { Ctx } from "./ctx";

type CommandResult = {
  mutations?: Array<Promise<any>>;
};

export type CommandHandler = (ctx: Ctx) => Promise<CommandResult>;

export const runner = (
  commands: Record<string, CommandHandler>,
  commandName: string,
  ctx: Ctx
): Promise<CommandResult> => {
  return commands[commandName](ctx);
};
