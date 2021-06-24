import { PrivateUserFieldsDto } from './privateUserFields.dto';
import { UserProfileDocument } from './userProfile.schema';

export class UserProfileDto {
  constructor(
    public authId: string,
    public username: string,
    public privateFields: PrivateUserFieldsDto,
    public listCount: number | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public isProfileOwner(userId: string) {
    return this.authId === userId;
  }

  public hidePrivateFields(userId: string): UserProfileDto {
    if (!this.isProfileOwner(userId)) this.privateFields = undefined;
    return this;
  }

  public static assign(doc: UserProfileDocument): UserProfileDto {
    return new UserProfileDto(
      doc.authId,
      doc.username,
      doc.privateFields,
      doc.listCount,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export class QueryUserProfileDto {
  public username?: string;
}

export class CreateUserProfileDto {
  constructor(
    public authId?: string,
    public username?: string,
    public privateFields?: PrivateUserFieldsDto,
  ) {}
}

export class PatchUserProfileDto {
  public username?: string;
  public recentActivityCount?: number;
  public activeListsCount?: number;
  public showActivityOnPublicProfile?: boolean;
  constructor({
    username = undefined,
    recentActivityCount = undefined,
    activeListsCount = undefined,
    showActivityOnPublicProfile = undefined,
  }) {
    this.username = username;
    this.recentActivityCount = recentActivityCount;
    this.activeListsCount = activeListsCount;
    this.showActivityOnPublicProfile = showActivityOnPublicProfile;
  }
}
