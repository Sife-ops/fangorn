import * as Entity from "./entity";
import { Service } from "electrodb";

export type Model = {
  ShiritoriEntity: typeof Entity.ShiritoriEntity;
  WordEntity: typeof Entity.WordEntity;
};

export const model = new Service<Model>({
  ShiritoriEntity: Entity.ShiritoriEntity,
  WordEntity: Entity.WordEntity,
});

// export interface _Collection {
//   _Entity: Entity._EntityType[];
// }
