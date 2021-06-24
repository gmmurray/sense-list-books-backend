import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getListModelName } from 'src/common/mongooseTableHelpers';
import { PrivateUserFields } from './privateUserFields.schema';

export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true })
export class UserProfile {
  @Prop({ required: true })
  authId: string;

  @Prop({ default: 'Anonymous' })
  username: string;

  @Prop({ type: PrivateUserFields, default: new PrivateUserFields() })
  privateFields: PrivateUserFields;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  // virtual/derived fields
  listCount: number;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

UserProfileSchema.virtual('listCount', {
  ref: getListModelName(),
  localField: 'authId',
  foreignField: 'ownerId',
  count: true,
});
