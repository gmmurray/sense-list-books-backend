import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrivateUserFieldsDocument = PrivateUserFields & Document;

export const defaultRecentActivityCount = 5;
export const defaultActiveListsCount = 3;
export const defaultShowActivityOnPublicProfile = false;

@Schema()
export class PrivateUserFields {
  @Prop({ default: defaultRecentActivityCount })
  recentActivityCount: number;

  @Prop({ default: defaultActiveListsCount })
  activeListsCount: number;

  @Prop({ default: defaultShowActivityOnPublicProfile })
  showActivityOnPublicProfile: boolean;
}
