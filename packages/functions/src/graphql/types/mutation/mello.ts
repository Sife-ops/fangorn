import { builder } from "../../builder";

builder.mutationFields((t) => ({
  mello: t.string({
    resolve: (_, __, ctx) => {
      return "hello";
    },
  }),
}));
