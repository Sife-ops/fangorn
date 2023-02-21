// import * as commands from "./commands";
import AWS from "aws-sdk";
import nacl from "tweetnacl";
import { Config } from "sst/node/config";
// import { Ctx } from "./ctx";
import { Function } from "sst/node/function";
// import { lambda } from "./common";
// import { runner } from "@psycho-mantis/bot/runner";

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";
import { Ctx } from "./ctx";

export const handler: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2<any>
> = async (event) => {
  const lambda = new AWS.Lambda();

  try {
    const interactionBody = JSON.parse(event.body!);

    switch (interactionBody.type) {
      case 1: {
        const verified = nacl.sign.detached.verify(
          Buffer.from(event.headers["x-signature-timestamp"]! + event.body),
          Buffer.from(event.headers["x-signature-ed25519"]!, "hex"),
          Buffer.from(Config.BOT_PUBLIC_KEY, "hex")
        );

        if (!verified) {
          throw new Error("verification failed");
        } else {
          return {
            statusCode: 200,
            body: event.body,
          };
        }
      }

      case 2: {
        await lambda
          .invokeAsync({
            FunctionName: Function.botLambda.functionName,
            InvokeArgs: JSON.stringify({ interactionBody }),
          })
          .promise();

        // return {
        //   type: 5, // deferred
        //   data: {
        //     flags: 64,
        //   },
        // };

        return {
          type: 4,
          data: {
            content: "bar",
          },
        };
      }

      default: {
        throw new Error(
          `unsupported interaction type: ${interactionBody.type}`
        );
      }
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401,
    };
  }
};

export const consumer = async (event: any) => {
  const ctx = await Ctx.init(event);

  try {
    await Promise.all(ctx.onboardUsers());
    // const { mutations } = await runner(
    //   commands,
    //   ctx.options.getCommandName(0),
    //   ctx
    // );
    // await Promise.all(mutations || []);
  } catch (e) {
    console.log(e);
    await ctx.followUp({
      content: "todo: sorry",
    });
  }
};
