import { builder } from "../../builder";
import { UserType } from "../user";

builder.queryFields((t) => ({
  hello: t.string({
    resolve: (_, __, ctx) => {
      return "hello";
    },
  }),

  viewer: t.field({
    type: UserType,
    resolve: (_, __, ctx) => ctx.getUser(),
  }),
}));
