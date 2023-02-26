import { Config } from "sst/node/config";
import { JwtPayload, verify } from "jsonwebtoken";
import { UserEntityType } from "@fangorn/core/db/entity";
import { model as model_ } from "@fangorn/core/db";
import { parse as parseGql } from "graphql";

interface Payload extends JwtPayload {
  userId: string;
  tokenVersion: number;
}

export class Ctx {
  event;
  model = model_;

  constructor(event: any) {
    this.event = event;
  }

  getPayload(): Payload {
    const token = this.event.headers.authorization;
    if (!token) throw new Error("missing authorization header");
    return verify(token, Config.WEB_TOKEN_SECRET) as Payload;
  }

  async getUser(): Promise<UserEntityType> {
    return model_.entities.UserEntity.get({
      userId: this.getPayload().userId,
    })
      .go()
      .then((e) => e.data)
      .then((user) => {
        if (!user) throw new Error("user not found");
        return user;
      });
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      return this.getUser()
        .then((user) => user.tokenVersion === this.getPayload().tokenVersion)
        .catch(() => false);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  getFirstFieldName(): string {
    const firstOperationDefinition = (ast: any) => ast.definitions[0];
    const firstFieldValueNameFromOperation = (operationDefinition: any) =>
      operationDefinition.selectionSet.selections[0].name.value;

    return firstFieldValueNameFromOperation(
      firstOperationDefinition(parseGql(JSON.parse(this.event.body).query))
    );
  }

  async isAuthorized(): Promise<boolean> {
    const operations: string[] = ["viewer"];
    if (operations.includes(this.getFirstFieldName())) {
      return await this.isAuthenticated();
    }
    return true;
  }
}
