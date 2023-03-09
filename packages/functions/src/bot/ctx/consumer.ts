import { Member } from "./member";
import { Options } from "./options";
import { ReplyI8l } from "./reply-i8l";
import { ShiritoriEntityType, WordEntityType } from "@fangorn/core/db/entity";
import { fetchDiscord, getRecentWords } from "../common";
import { model as model_ } from "@fangorn/core/db";

export class ConsumerCtx {
  model = model_;
  interactionBody;
  options;
  member;
  shiritori;
  replyI8l;

  private constructor(c: {
    interactionBody: any;
    shiritori: ShiritoriEntityType;
  }) {
    this.interactionBody = c.interactionBody;
    this.options = new Options({ interactionBody: c.interactionBody });
    this.member = new Member({ interactionBody: c.interactionBody });
    this.shiritori = c.shiritori;
    this.replyI8l = new ReplyI8l({ shiritori: c.shiritori });
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

  getChannelId(): string {
    return this.interactionBody.channel_id;
  }

  private setShiritori() {
    return this.model.entities.ShiritoriEntity.update({
      shiritoriId: this.shiritori.shiritoriId,
    });
  }

  setShiritoriChannel() {
    return this.setShiritori().set({ channelId: this.getChannelId() }).go();
  }

  setShiritoriLanguage() {
    return this.setShiritori()
      .set({ language: this.options.getOptionValue("language") as "en" | "jp" })
      .go();
  }

  async getRecentWords(): Promise<WordEntityType[]> {
    return getRecentWords(this.shiritori.shiritoriId);
  }

  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, { body });
  }
}
