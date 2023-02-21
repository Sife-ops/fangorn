import { fetchDiscord, onboardUser } from "./common";
import { model as model_ } from "@fangorn/core/db";

interface Option {
  name: string;
  type: number;
  value?: string | number;
  options?: Option[];
}

export class Options {
  private interactionBody;

  constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
  }

  getFlatOptions(): Option[][] {
    const recurse = (options: Option[]): Option[][] => {
      if (!options || options.length < 1) return [];
      const firstOption = options[0];
      if (firstOption.options && firstOption.options.length > 0) {
        return [[firstOption], ...recurse(firstOption.options)];
      }
      return [options];
    };

    const {
      data: { name, options, type },
    } = this.interactionBody;

    return [
      [
        {
          name,
          options,
          type,
        },
      ],
      ...recurse(options),
    ];
  }

  getCommandName(index: number): string {
    return this.getFlatOptions()[index][0].name;
  }

  getOptionValue(optionName: string): string | number {
    const flatOptions = this.getFlatOptions();
    const value = flatOptions[flatOptions.length - 1].find(
      (option) => option.name === optionName
    )?.value;
    if (!value) throw new Error(`option not found: "${optionName}"`);
    return value;
  }
}

export class Ctx {
  model = model_;
  interactionBody;
  options;

  private constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
    this.options = new Options({ interactionBody: c.interactionBody });
  }

  static async init({ interactionBody }: { interactionBody: any }) {
    return new Ctx({
      interactionBody,
    });
  }

  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, {
      body,
    });
  }

  // // websocket
  // messageClient(connectionId: string, message: any) {
  //   return new Promise((resolve, reject) => {
  //     wsApi.postToConnection(
  //       {
  //         ConnectionId: connectionId,
  //         Data: JSON.stringify(message),
  //       },

  //       (err, data) => {
  //         if (err) {
  //           console.log("err is", err);
  //           reject(err);
  //         }

  //         resolve(data);
  //       }
  //     );
  //   });
  // }

  // allMessages(message: any) {
  //   try {
  //     return this.getRoomCollection().ConnectionEntity.map(({ connectionId }) =>
  //       this.messageClient(connectionId, message)
  //     );
  //   } catch {
  //     return [];
  //   }
  // }

  // body
  getChannelId(): string {
    return this.interactionBody.channel_id;
  }

  getUser() {
    return this.interactionBody.member.user;
  }

  getUserId(): string {
    return this.getUser().id;
  }

  // // room
  // getRoomCollection() {
  //   if (!this.roomCollection) throw new Error("missing roomCollection");
  //   return this.roomCollection;
  // }

  // hasRoom() {
  //   return !!this.roomCollection;
  // }

  // getRoom() {
  //   return this.getRoomCollection().RoomEntity[0];
  // }

  // // player
  // getPlayers() {
  //   return this.getRoomCollection().PlayerEntity;
  // }

  getResolvedUsers() {
    return this.interactionBody.data.resolved.users;
  }

  // onboard
  onboardMember() {
    return onboardUser(this.getUser());
  }

  onboardResolved() {
    try {
      const resolved = this.getResolvedUsers();
      return Object.keys(resolved)
        .map((key) => resolved[key])
        .map((user) => onboardUser(user));
    } catch {
      return [];
    }
  }

  onboardUsers() {
    return [this.onboardMember(), ...this.onboardResolved()];
  }
}