import { ShiritoriEntityType } from "@fangorn/core/db/entity";

export class ReplyI8l {
  shiritori;

  constructor(c: { shiritori: ShiritoriEntityType }) {
    this.shiritori = c.shiritori;
  }

  private isJp(): boolean {
    return this.shiritori.language === "jp";
  }

  unauthorized(name: string, id: string): string {
    return this.isJp()
      ? `</${name}:${id}>は管理者のみ使う事が出来ます。`
      : `You must be an administrator to use </${name}:${id}>.`;
  }

  channelNotSet(): string {
    return this.isJp()
      ? "???"
      : "Channel not set. Use `/channel` in a channel to use it for Shiritori.";
  }

  wrongChannel(channel: string): string {
    return this.isJp()
      ? `<#${channel}>のみにて尻取り遊ぶ事が出来ます。`
      : `You can only play shiritori in <#${channel}>.`;
  }

  notYourTurn(): string {
    return this.isJp() ? "???" : "You must wait until the next round.";
  }

  cooldown(n: number): string {
    return this.isJp()
      ? "???"
      : `That word is in cooldown for the next ${n} turns.`;
  }

  language(language: "en" | "jp"): string {
    return language === "jp"
      ? "言語を日本語に設定しました。"
      : "Language has been set to English.";
  }

  channel(channelId: string): string {
    return this.isJp()
      ? `チャンネルを<#${channelId}>に設定しました。`
      : `Channel has been set to <#${channelId}>.`;
  }

  shiritoriBad(word: string): string {
    return this.isJp()
      ? `\`${word}\`は尻取りではありません!`
      : `\`${word}\` is not a shiritori!`;
  }

  shiritoriGet(): string {
    return this.isJp() ? "尻取りゲット!" : "Shiritori get!";
  }

  shiritoriNotFound(word: string): string {
    return this.isJp()
      ? `\`${word}\`は見付かりませんでした!`
      : `\`${word}\` could not be found!`;
  }
}
