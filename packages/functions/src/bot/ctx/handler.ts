import { Options } from "./options";
import { ShiritoriEntityType, WordEntityType } from "@fangorn/core/db/entity";
import { fetchDiscord } from "../common";
import { model as model_ } from "@fangorn/core/db";

export class HandlerCtx {
  model = model_;
  interactionBody;
  options;
  shiritori;

  private constructor(c: {
    interactionBody: any;
    shiritori: ShiritoriEntityType;
  }) {
    this.interactionBody = c.interactionBody;
    this.options = new Options({ interactionBody: c.interactionBody });
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

  // todo: dedup
  getMember(): any {
    return this.interactionBody.member;
  }

  // todo: dedup
  getMemberId(): any {
    return this.interactionBody.member.user.id;
  }

  isMemberAdmin(): boolean {
    return (parseInt(this.getMember().permissions) & (1 << 3)) > 0;
  }

  isMemberAuthorized(): boolean {
    const authorized = ["channel", "language"];
    if (authorized.includes(this.options.getCommandName(0))) {
      return this.isMemberAdmin();
    }
    return true;
  }

  // todo: dedup
  async getRecentWords(): Promise<WordEntityType[]> {
    return this.model.entities.WordEntity.query
      .shiritori_({ shiritoriId: this.shiritori.shiritoriId })
      .go({ order: "desc", limit: 100 })
      .then((result) => result.data);
  }
}
