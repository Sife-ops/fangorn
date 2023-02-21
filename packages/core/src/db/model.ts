import * as Entity from "./entity";
import { Service } from "electrodb";

export type Model = {
  UserEntity: typeof Entity.UserEntity;
  // BuildingEntity: typeof Entity.BuildingEntity;
  // ChitEntity: typeof Entity.ChitEntity;
  // GameEntity: typeof Entity.GameEntity;
  // HarborEntity: typeof Entity.HarborEntity;
  // MapEntity: typeof Entity.MapEntity;
  // PlayerEntity: typeof Entity.PlayerEntity;
  // RoadEntity: typeof Entity.RoadEntity;
  // TerrainEntity: typeof Entity.TerrainEntity;
  // ConnectionEntity: typeof Entity.ConnectionEntity;
  // RobberEntity: typeof Entity.RobberEntity;
};

export const model = new Service<Model>({
  UserEntity: Entity.UserEntity,
  // BuildingEntity: Entity.BuildingEntity,
  // ChitEntity: Entity.ChitEntity,
  // GameEntity: Entity.GameEntity,
  // HarborEntity: Entity.HarborEntity,
  // MapEntity: Entity.MapEntity,
  // PlayerEntity: Entity.PlayerEntity,
  // RoadEntity: Entity.RoadEntity,
  // TerrainEntity: Entity.TerrainEntity,
  // ConnectionEntity: Entity.ConnectionEntity,
  // RobberEntity: Entity.RobberEntity,
});

// export interface GameCollection {
//   BuildingEntity: Entity.BuildingEntityType[];
//   ChitEntity: Entity.ChitEntityType[];
//   GameEntity: Entity.GameEntityType[];
//   HarborEntity: Entity.HarborEntityType[];
//   PlayerEntity: Entity.PlayerEntityType[];
//   RoadEntity: Entity.RoadEntityType[];
//   TerrainEntity: Entity.TerrainEntityType[];
//   ConnectionEntity: Entity.ConnectionEntityType[];
//   RobberEntity: Entity.RobberEntityType[];
// }
