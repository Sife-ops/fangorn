import { builder } from "../../builder";

builder.mutationFields((t) => ({
  mello: t.string({
    resolve: () => "hello",
  }),
}));
