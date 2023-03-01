import { UserEntityType } from "@fangorn/core/db/entity";
import { builder } from "../builder";

export const UserType = builder.objectRef<
  UserEntityType & {
    cursor?: string | null;
  }
>("User");
UserType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId", { nullable: true }),
    username: t.exposeString("username", { nullable: true }),
    discriminator: t.exposeString("discriminator", { nullable: true }),
    avatar: t.exposeString("avatar"),
    displayName: t.exposeString("displayName"),
    visible: t.exposeBoolean("visible"),
    description: t.exposeString("description", { nullable: true }),
    lastSeen: t.exposeString("lastSeen"),
    createdAt: t.exposeString("createdAt"),
    cursor: t.exposeString("cursor", { nullable: true }),
  }),
});
