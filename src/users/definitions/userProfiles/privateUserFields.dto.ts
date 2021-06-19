import {
  defaultActiveListsCount,
  defaultRecentActivityCount,
  defaultShowActivityOnPublicProfile,
} from './privateUserFields.schema';

export class PrivateUserFieldsDto {
  constructor(
    public recentActivityCount: number = defaultRecentActivityCount,
    public activeListsCount: number = defaultActiveListsCount,
    public showActivityOnPublicProfile: boolean = defaultShowActivityOnPublicProfile,
  ) {}
}
