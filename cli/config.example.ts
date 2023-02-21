const { DC_ENV } = process.env;

switch (DC_ENV) {
  case "wgoettsch":
    break;
  default:
    throw new Error("invalid DC_ENV");
}

const config = {
  wgoettsch: {
    BOT_TOKEN: "",
    APP_ID: "",
    GUILD_ID: "",
  },
};

export default config[DC_ENV];
