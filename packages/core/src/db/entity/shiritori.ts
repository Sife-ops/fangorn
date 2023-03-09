import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ShiritoriEntity = new Entity(
  {
    indexes: {
      shiritori: {
        pk: {
          field: "pk",
          composite: ["shiritoriId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },

      shiritori_: {
        collection: "shiritori",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["shiritoriId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["score"],
        },
      },

      guild_: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["guildId"],
        },
        sk: {
          field: "gsi2sk",
          composite: [],
        },
      },
    },

    attributes: {
      shiritoriId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      guildId: {
        type: "string",
        required: true,
      },

      guildName: {
        type: "string",
        required: true,
      },

      score: {
        type: "number",
        required: true,
        default: 0,
      },

      createdAt: {
        type: "string",
        required: true,
        default: () => new Date().toISOString(),
      },

      //
      // options
      //

      channelId: {
        type: "string",
        required: false,
      },

      showRanking: {
        type: "boolean",
        required: true,
        default: false,
      },

      language: {
        type: ["en", "jp"] as const,
        required: true,
        default: "jp",
      },
    },

    model: {
      version: "1",
      entity: "Shiritori",
      service: "fangorn",
    },
  },
  Dynamo.Configuration
);

export type ShiritoriEntityType = EntityItem<typeof ShiritoriEntity>;
