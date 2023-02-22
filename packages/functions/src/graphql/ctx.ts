import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { Config } from "sst/node/config";
import { ExecutionContext } from "graphql-helix";
import { JwtPayload, verify } from "jsonwebtoken";
import { model as model_ } from "@fangorn/core/db";

interface Request {
  event: APIGatewayProxyEventV2;
  context: Context;
  execution: ExecutionContext;
}

interface Payload extends JwtPayload {
  userId: string;
}

export class Ctx {
  model = model_;
  jwtPayload;
  request;

  private constructor(c: { request: Request; jwtPayload: Payload }) {
    this.jwtPayload = c.jwtPayload;
    this.request = c.request;
  }

  static async init(c: { request: Request }) {
    const token = c.request.event.headers.authorization; // todo: if not defined
    if (!token) throw new Error("missing token");

    let jwtPayload: Payload;
    try {
      jwtPayload = verify(token, Config.WEB_TOKEN_SECRET) as Payload;
    } catch (e) {
      console.log(e);
      throw new Error("failed to verify token");
    }

    return new Ctx({
      jwtPayload,
      request: c.request,
    });
  }
}
