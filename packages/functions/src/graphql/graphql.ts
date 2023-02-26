import { Ctx } from "./ctx";
import { GraphQLHandler } from "sst/node/graphql";
import { schema } from "./schema";

export const handler = async (event: any, context: any) => {
  const ctx = new Ctx(event);

  if (await ctx.isAuthorized()) {
    return GraphQLHandler({
      schema,
      context: async (_request): Promise<Ctx> => ctx,
    })(event, context);
  }

  return {
    statusCode: 401,
    headers: {},
    body: "unauthorized",
  };
};
