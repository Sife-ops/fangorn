import { builder } from "../../builder";
import { UserType } from "../user";

const searchInput = builder.inputType("SearchInput", {
  fields: (t) => ({
    cursor: t.string(),
    gender: t.string(),
  }),
});

builder.mutationFields((t) => ({
  mello: t.string({
    resolve: (_, __, ctx) => {
      return "hello";
    },
  }),

  search: t.field({
    type: [UserType],
    args: {
      input: t.arg({ type: searchInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      const users: Array<any> = [];
      let cursor: string | null = args.input.cursor || null;

      while (users.length < 10) {
        const result = await ctx.model.entities.UserEntity.query
          .recent_({})
          .where((e, { eq }) => eq(e.visible, true))
          .go({
            order: "desc",
            limit: 10,
            cursor,
          });

        users.push(...result.data);

        cursor = result.cursor;
        if (!result.cursor) break;
      }

      return users.map((e) => ({
        ...e,
        discordId: null,
        username: null,
        discriminator: null,
        cursor,
      }));
    },
  }),
}));
