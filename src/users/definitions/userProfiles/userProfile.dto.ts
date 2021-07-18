import { RecentActivity } from '../recentActivity';
import { PrivateUserFieldsDto } from './privateUserFields.dto';
import { UserProfileDocument } from './userProfile.schema';

export class UserProfileDto {
  constructor(
    public authId: string,
    public username: string,
    public privateFields: PrivateUserFieldsDto,
    public pinnedListId: string,
    public listCount: number | null,
    public createdAt: Date,
    public updatedAt: Date,
    public recentActivity: RecentActivity[],
  ) {}

  public isProfileOwner(userId: string) {
    return this.authId === userId;
  }

  public hidePrivateFields(userId: string): UserProfileDto {
    if (!this.isProfileOwner(userId)) {
      this.privateFields = undefined;
    }
    return this;
  }

  public static assign(
    doc: UserProfileDocument,
    recentActivity: RecentActivity[],
  ): UserProfileDto {
    return new UserProfileDto(
      doc.authId,
      doc.username,
      doc.privateFields,
      doc.pinnedListId,
      doc.listCount,
      doc.createdAt,
      doc.updatedAt,
      recentActivity,
    );
  }
}

export class QueryUserProfileDto {
  public username?: string;
}

export class CreateUserProfileDto {
  constructor(
    public username: string,
    public authId: string,
    public privateFields?: PrivateUserFieldsDto,
  ) {}
}

export class PatchUserProfileDto {
  public username?: string;
  public pinnedListId?: string;
  public recentActivityCount?: number;
  public activeListsCount?: number;
  public showActivityOnPublicProfile?: boolean;
  constructor({
    username = undefined,
    pinnedListId = undefined,
    recentActivityCount = undefined,
    activeListsCount = undefined,
    showActivityOnPublicProfile = undefined,
  }) {
    this.username = username;
    this.pinnedListId = pinnedListId;
    this.recentActivityCount = recentActivityCount;
    this.activeListsCount = activeListsCount;
    this.showActivityOnPublicProfile = showActivityOnPublicProfile;
  }
}
