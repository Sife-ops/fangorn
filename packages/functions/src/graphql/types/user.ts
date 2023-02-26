import { UserEntityType } from "@fangorn/core/db/entity";
import { builder } from "../builder";

export const UserType = builder.objectRef<UserEntityType>("User");
UserType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId"),
    username: t.exposeString("username"),
    discriminator: t.exposeString("discriminator"),
    avatar: t.exposeString("avatar"),
    active: t.exposeBoolean("active"),
  }),
});
