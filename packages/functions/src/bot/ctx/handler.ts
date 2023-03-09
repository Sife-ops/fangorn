import { Member } from "./member";
import { Options } from "./options";
import { ShiritoriEntityType, WordEntityType } from "@fangorn/core/db/entity";
import { fetchDiscord, getRecentWords } from "../common";
import { model as model_ } from "@fangorn/core/db";

export class HandlerCtx {
  model = model_;
  interactionBody;
  options;
  member;
  shiritori;

  private constructor(c: {
    interactionBody: any;
    shiritori: ShiritoriEntityType;
  }) {
    this.interactionBody = c.interactionBody;
    this.options = new Options({ interactionBody: c.interactionBody });
    this.member = new Member({ interactionBody: c.interactionBody });
    this.shiritori = c.shiritori;
  }

  static async init({ interactionBody }: { interactionBody: any }) {
    const shiritori = await model_.entities.ShiritoriEntity.query
      .guild_({
        guildId: interactionBody.guild_id,
      })
      .go()
      .then((result) => result.data[0])
      .then(async (shiritori) => {
        if (!shiritori) {
          // todo: update guild name
          const guild = await fetchDiscord(
            `/guilds/${interactionBody.guild_id}`,
            { method: "GET" }
          ).then((result) => result.json() as any);

          return model_.entities.ShiritoriEntity.create({
            guildId: interactionBody.guild_id,
            guildName: guild.name,
          })
            .go()
            .then((result) => result.data);
        }

        return shiritori;
      });

    return new HandlerCtx({ interactionBody, shiritori });
  }

  isMemberAuthorized(): boolean {
    const authorized = ["channel", "language"];
    if (authorized.includes(this.options.getCommandName(0))) {
      return this.member.isAdmin();
    }
    return true;
  }

  async getRecentWords(): Promise<WordEntityType[]> {
    return getRecentWords(this.shiritori.shiritoriId);
  }
}
