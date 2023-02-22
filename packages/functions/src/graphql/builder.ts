import DataloaderPlugin from "@pothos/plugin-dataloader";
import SchemaBuilder from "@pothos/core";
import { Ctx } from "./ctx";

export const builder = new SchemaBuilder<{
  Context: Ctx;
}>({
  plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});
