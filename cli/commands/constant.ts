import config from "../config";

const { APP_ID, GUILD_ID, BOT_TOKEN } = config;

export const url = `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

export const headers = {
  Authorization: `Bot ${BOT_TOKEN}`,
  "Content-Type": "application/json",
};
