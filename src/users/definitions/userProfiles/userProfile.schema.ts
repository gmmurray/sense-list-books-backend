import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
