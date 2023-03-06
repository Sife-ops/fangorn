import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

export const UserEntity = new Entity(
  {
    indexes: {
      user: {
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },

      user_: {
        collection: "user",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },

      discordId_: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["discordId"],
        },
        sk: {
          field: "gsi2sk",
          composite: [],
        },
      },

      recent_: {
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: [],
        },
        sk: {
          field: "gsi3sk",
          composite: ["lastSeen"],
        },
      },
    },

    attributes: {
      userId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      discordId: {
        type: "string",
        required: true,
      },

      username: {
        type: "string",
        required: true,
      },

      discriminator: {
        type: "string",
        required: true,
      },

      avatar: {
        type: "string",
        required: true,
      },

      displayName: {
        type: "string",
        required: true,
        default: () =>
          `${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`,
      },

      tokenVersion: {
        type: "number",
        required: true,
        default: 0,
      },

      visible: {
        type: "boolean",
        required: true,
        default: false,
      },

      description: {
        type: "string",
        required: false,
      },

      gender: {
        type: "string",
        required: false,
      },

      // age: {
      //   type: "number",
      //   required: false,
      // },

      // coordinates: {
      //   type: "string",
      //   required: false,
      // },

      lastSeen: {
        type: "string",
        required: true,
        default: () => new Date().toISOString(),
      },

      createdAt: {
        type: "string",
        required: true,
        default: () => new Date().toISOString(),
      },
    },

    model: {
      version: "1",
      entity: "User",
      service: "fangorn",
    },
  },
  Dynamo.Configuration
);

export type UserEntityType = EntityItem<typeof UserEntity>;
