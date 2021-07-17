import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from 'src/authz/authz.module';
import { ListsModule } from 'src/lists/lists.module';
import { UserListItemsModule } from 'src/userListItems/userListItems.module';
import { UserListsModule } from 'src/userLists/userLists.module';
import {
  UserProfile,
  UserProfileSchema,
} from '../definitions/userProfiles/userProfile.schema';
import { BookUsersController } from './bookUsers.controller';
import { BookUsersService } from './bookUsers.service';

@Module({
  imports: [
    UserListsModule,
    UserListItemsModule,
    ListsModule,
    AuthzModule,
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: UserProfileSchema,
      },
    ]),
  ],
  controllers: [BookUsersController],
  providers: [BookUsersService],
})
export class BookUsersModule {}
