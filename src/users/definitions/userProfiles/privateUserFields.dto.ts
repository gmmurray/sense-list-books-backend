import {
  defaultActiveListsCount,
  defaultPubliclyShowUserStatistics,
  defaultRecentActivityCount,
  defaultShowActivityOnPublicProfile,
} from './privateUserFields.schema';

export class PrivateUserFieldsDto {
  constructor(
    public recentActivityCount: number = defaultRecentActivityCount,
    public activeListsCount: number = defaultActiveListsCount,
    public showActivityOnPublicProfile: boolean = defaultShowActivityOnPublicProfile,
    public publiclyShowUserStatistics: boolean = defaultPubliclyShowUserStatistics,
  ) {}
}
