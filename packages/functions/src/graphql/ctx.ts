import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { Config } from "sst/node/config";
import { ExecutionContext } from "graphql-helix";
import { JwtPayload, verify } from "jsonwebtoken";
import { UserEntityType } from "@fangorn/core/db/entity";
import { model as model_ } from "@fangorn/core/db";

interface Request {
  event: APIGatewayProxyEventV2;
  context: Context;
  execution: ExecutionContext;
}

interface Payload extends JwtPayload {
  userId: string;
  tokenVersion: number;
}

export class Ctx {
  model = model_;
  request;
  jwtPayload;
  user;
  authenticated;

  private constructor(c: {
    request: Request;
    jwtPayload?: Payload;
    user?: UserEntityType;
    authenticated: boolean;
  }) {
    this.request = c.request;
    this.jwtPayload = c.jwtPayload;
    this.user = c.user;
    this.authenticated = c.authenticated;
  }

  static async init(c: { request: Request }) {
    const token = c.request.event.headers.authorization; // todo: if not defined

    let jwtPayload: Payload | undefined;
    let user: UserEntityType | undefined;
    let authenticated = false;

    if (token) {
      try {
        jwtPayload = verify(token, Config.WEB_TOKEN_SECRET) as Payload;
      } catch (e) {
        console.log(e);
        throw new Error("jsonwebtoken error");
      }

      user = await model_.entities.UserEntity.get({
        userId: jwtPayload.userId,
      })
        .go()
        .then((e) => {
          if (!e.data) throw new Error("user not found");
          return e.data;
        });

      if (user && user.tokenVersion !== jwtPayload.tokenVersion) {
        throw new Error("invalid tokenVersion");
      }

      authenticated = true;
    }

    return new Ctx({
      request: c.request,
      jwtPayload,
      user,
      authenticated,
    });
  }

  getUser(): UserEntityType {
    if (!this.user) throw new Error("user undefined");
    return this.user;
  }
}
