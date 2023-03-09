import { hashSync } from "bcryptjs";

export class Member {
  private interactionBody;

  constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
  }

  private getMember(): any {
    return this.interactionBody.member;
  }

  getPermissions(): string {
    return this.getMember().permissions;
  }

  getId(): string {
    return this.getMember().user.id;
  }

  getIdHash(): string {
    return hashSync(this.getId());
  }

  isAdmin(): boolean {
    return (parseInt(this.getPermissions()) & (1 << 3)) > 0;
  }
}
