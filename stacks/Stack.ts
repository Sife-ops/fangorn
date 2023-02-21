import { StackContext, Api, Table, use, Config } from "sst/constructs";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
      gsi3pk: "string",
      gsi3sk: "string",
      gsi4pk: "string",
      gsi4sk: "string",
      gsi5pk: "string",
      gsi5sk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk",
      },
      gsi2: {
        partitionKey: "gsi2pk",
        sortKey: "gsi2sk",
      },
      gsi3: {
        partitionKey: "gsi3pk",
        sortKey: "gsi3sk",
      },
      gsi4: {
        partitionKey: "gsi4pk",
        sortKey: "gsi4sk",
      },
      gsi5: {
        partitionKey: "gsi5pk",
        sortKey: "gsi5sk",
      },
    },
  });

  return {
    table,
  };
}

export function Parameters({ stack }: StackContext) {
  const botPublicKey = new Config.Secret(stack, "BOT_PUBLIC_KEY");
  // const botToken = new Config.Secret(stack, "BOT_TOKEN");
  // const webTokenSecret = new Config.Secret(stack, "WEB_TOKEN_SECRET");

  return {
    botPublicKey,
    // botToken,
    // webTokenSecret,
  };
}

export function API({ stack }: StackContext) {
  const db = use(Database);
  const param = use(Parameters);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [db.table, param.botPublicKey],
      },
    },
    routes: {
      "POST /bot": "packages/functions/src/bot/main.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
