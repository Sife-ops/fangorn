import { builder } from "../../builder";

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => "hello",
  }),
}));
