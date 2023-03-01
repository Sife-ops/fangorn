import { builder } from "../../builder";
import { UserType } from "../user";

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => {
      return "hello";
    },
  }),

  viewer: t.field({
    type: UserType,
    resolve: (_, __, ctx) => ctx.getViewer(),
  }),
}));
