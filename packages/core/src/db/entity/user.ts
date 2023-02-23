import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
//

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

      tokenVersion: {
        type: "number",
        required: true,
        default: 0,
      },

      active: {
        type: "boolean",
        required: true,
        default: false,
      },

      gender: {
        type: "string",
        required: false,
      },

      age: {
        type: "number",
        required: false,
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
