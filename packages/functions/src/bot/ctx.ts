import { Config } from "sst/node/config";
import { UserEntityType } from "@fangorn/core/db/entity";
import { fetchDiscord } from "./common";
import { model as model_ } from "@fangorn/core/db";
import { sign } from "jsonwebtoken";

interface Option {
  name: string;
  type: number;
  value?: string | number;
  options?: Option[];
}

export class Options {
  private interactionBody;

  constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
  }

  getFlatOptions(): Option[][] {
    const recurse = (options: Option[]): Option[][] => {
      if (!options || options.length < 1) return [];
      const firstOption = options[0];
      if (firstOption.options && firstOption.options.length > 0) {
        return [[firstOption], ...recurse(firstOption.options)];
      }
      return [options];
    };

    const {
      data: { name, options, type },
    } = this.interactionBody;

    return [
      [
        {
          name,
          options,
          type,
        },
      ],
      ...recurse(options),
    ];
  }

  getCommandName(index: number): string {
    return this.getFlatOptions()[index][0].name;
  }

  getOptionValue(optionName: string): string | number {
    const flatOptions = this.getFlatOptions();
    const value = flatOptions[flatOptions.length - 1].find(
      (option) => option.name === optionName
    )?.value;
    if (!value) throw new Error(`option not found: "${optionName}"`);
    return value;
  }
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export class Ctx {
  model = model_;
  interactionBody;
  options;

  constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
    this.options = new Options({ interactionBody: c.interactionBody });
  }

  // body
  getChannelId(): string {
    return this.interactionBody.channel_id;
  }

  getMemberUser(): DiscordUser {
    return this.interactionBody.member.user;
  }

  getResolvedUsers(): Record<string, DiscordUser> {
    return this.interactionBody.data.resolved.users;
  }

  async getUserEntity(
    discordId: string = this.getMemberUser().id
  ): Promise<UserEntityType> {
    return this.model.entities.UserEntity.query
      .discordId_({ discordId })
      .go()
      .then((e) => {
        if (e.data.length < 1) throw new Error("user not found");
        return e.data[0];
      });
  }

  // token
  async getToken(): Promise<string> {
    const { userId, tokenVersion } = await this.getUserEntity();

    await this.model.entities.UserEntity.update({ userId })
      .add({ tokenVersion: 1 })
      .go()
      .then((e) => e.data);

    return sign(
      { userId, tokenVersion: tokenVersion + 1 },
      Config.WEB_TOKEN_SECRET
    );
  }

  // onboard
  async onboard(discordUser: DiscordUser): Promise<void> {
    return this.getUserEntity(discordUser.id)
      .then(async (user) => {
        if (
          user.avatar !== discordUser.avatar ||
          user.discriminator !== discordUser.discriminator ||
          user.username !== discordUser.username
        ) {
          await this.model.entities.UserEntity.update({ userId: user.userId })
            .set({
              username: discordUser.username,
              discriminator: discordUser.discriminator,
              avatar: discordUser.avatar,
            })
            .go();
        }
      })
      .catch(async () => {
        await this.model.entities.UserEntity.create({
          discordId: discordUser.id,
          username: discordUser.username,
          discriminator: discordUser.discriminator,
          avatar: discordUser.avatar || "",
        }).go();
      });
  }

  onboardMember(): Promise<void> {
    return this.onboard(this.getMemberUser());
  }

  onboardResolved(): Promise<void>[] {
    try {
      const resolved = this.getResolvedUsers();
      return Object.keys(resolved)
        .map((key) => resolved[key])
        .map((user) => this.onboard(user));
    } catch {
      return [];
    }
  }

  onboardUsers(): Promise<void>[] {
    return [this.onboardMember(), ...this.onboardResolved()];
  }

  // deferred response
  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, { body });
  }
}
