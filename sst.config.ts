import { SSTConfig } from "sst";
import { API, Database, Parameters } from "./stacks/Stack";

export default {
  config(_input) {
    return {
      name: "fangorn",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Parameters).stack(Database).stack(API);
  },
} satisfies SSTConfig;
