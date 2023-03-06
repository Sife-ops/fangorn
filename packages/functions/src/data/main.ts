import { model } from "@fangorn/core/db";
import { faker } from "@faker-js/faker";
import { UserEntityType } from "@fangorn/core/db/entity";

export const handler = async (_event: any) => {
  const a = 1675212838000; // 23/2/1
  const b = Date.now();

  await Promise.all(
    Array(100)
      .fill(null)
      .map((_, i) => {
        return model.entities.UserEntity.create({
          discordId: faker.random.numeric(18).toString(),
          username: faker.word.noun(),
          discriminator: faker.random.numeric(4).toString(),
          avatar: "",
          visible: faker.datatype.boolean(),
          description: faker.lorem.sentences(2),
          lastSeen: new Date(
            faker.datatype.number({ min: a, max: b })
          ).toISOString(),
        }).go();
      })
  );

  //   const users: UserEntityType[] = [];
  //   do {
  //     let cursor: string | null = null;
  //     const result = await model.entities.UserEntity.query
  //       .recent_({})
  //       .where((e, { eq }) => eq(e.active, true))
  //       .go({ order: "desc", limit: 5, cursor });
  //     users.push(...result.data);
  //     if (!result.cursor) break;
  //     cursor = result.cursor;
  //   } while (users.length < 10);
  //   console.log(users);

  //
};
