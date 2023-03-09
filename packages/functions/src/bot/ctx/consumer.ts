import { Options } from "./options";
import { ShiritoriEntityType, WordEntityType } from "@fangorn/core/db/entity";
import { fetchDiscord } from "../common";
import { hashSync } from "bcryptjs";
import { model as model_ } from "@fangorn/core/db";

export class ConsumerCtx {
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
      .then((result) => result.data[0]);

    return new ConsumerCtx({ interactionBody, shiritori });
  }

  // todo: dedup
  getMember(): any {
    return this.interactionBody.member;
  }

  // todo: dedup
  getMemberId(): any {
    return this.interactionBody.member.user.id;
  }

  getMemberIdHash(): string {
    return hashSync(this.getMemberId());
  }

  setShiritoriChannel() {
    return this.model.entities.ShiritoriEntity.update({
      shiritoriId: this.shiritori.shiritoriId,
    })
      .set({
        channelId: this.interactionBody.channel_id,
      })
      .go();
  }

  // todo: dedup
  async getRecentWords(): Promise<WordEntityType[]> {
    return this.model.entities.WordEntity.query
      .shiritori_({ shiritoriId: this.shiritori.shiritoriId })
      .go({ order: "desc", limit: 100 })
      .then((result) => result.data);
  }

  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, { body });
  }
}
