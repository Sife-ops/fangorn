import { ConsumerCtx } from "./ctx/consumer";

type CommandResult = {
  mutations?: Array<Promise<any>>;
};

export type CommandHandler = (ctx: ConsumerCtx) => Promise<CommandResult>;

export const runner = (
  commands: Record<string, CommandHandler>,
  commandName: string,
  ctx: ConsumerCtx
): Promise<CommandResult> => {
  return commands[commandName](ctx);
};
