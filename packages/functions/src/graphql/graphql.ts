// import { Ctx } from "./ctx";
import { GraphQLHandler } from "sst/node/graphql";
import { schema } from "./schema";

export const handler = GraphQLHandler({
  schema,
  // context: async (request) => {
  //   return await Ctx.init({ request });
  // },
});
