import { SSTConfig } from "sst";
import { API, Database, Parameters, Web } from "./stacks/Stack";

export default {
  config(_input) {
    return {
      name: "fangorn",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Parameters).stack(Database).stack(API).stack(Web);
  },
} satisfies SSTConfig;
