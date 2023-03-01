import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { faker } from "@faker-js/faker";

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

      recent_: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: [],
        },
        sk: {
          field: "gsi2sk",
          composite: ["lastSeen"],
        },
      },
    },

    attributes: {
      userId: {
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
