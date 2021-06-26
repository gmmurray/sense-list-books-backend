import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error as MongooseError, Model, Types } from 'mongoose';
import { cleanDtoFields } from 'src/common/dtoHelpers';
import { handleHttpRequestError } from 'src/common/exceptionWrappers';
import {
  getPrivateFieldsPropName,
  getUserProfileListCountPropName,
} from 'src/common/mongooseTableHelpers';
import { ListType } from 'src/common/types/listType';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { StringIdType } from 'src/common/types/stringIdType';
import { RECENT_ACTIVITY_COUNT } from 'src/constants/activity';
import { BookListItemDto } from 'src/listItems/books/definitions/bookListItem.dto';
import { ListDto } from 'src/lists/definitions/list.dto';
import { BULIService } from 'src/userListItems/books/buli.service';
import { BULIDto } from 'src/userListItems/books/definitions/buli.dto';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserListsService } from 'src/userLists/userLists.service';
import { ActivityType } from '../definitions/activityType';
import {
  RecentActivity,
  RecentBULIActivity,
  RecentUserListActivity,
} from '../definitions/recentActivity';
import { PrivateUserFieldsDto } from '../definitions/userProfiles/privateUserFields.dto';
import {
  CreateUserProfileDto,
  PatchUserProfileDto,
  UserProfileDto,
} from '../definitions/userProfiles/userProfile.dto';
import {
  UserProfile,
  UserProfileDocument,
} from '../definitions/userProfiles/userProfile.schema';

@Injectable()
export class BookUsersService {
  constructor(
    private readonly userListsService: UserListsService,
    private readonly buliService: BULIService,
    @InjectModel(UserProfile.name)
    private userProfileModel: Model<UserProfileDocument>,
  ) {}

  async findUserProfile(
    authId: string,
    userId: string,
  ): Promise<UserProfileDto> {
    try {
      const userProfile = await this.userProfileModel
        .findOne({ authId })
        .populate(getUserProfileListCountPropName());

      if (!userProfile) throw new MongooseError.DocumentNotFoundError(null);

      const recentActivity = await this.getRecentActivity(
        userId,
        userProfile.privateFields.recentActivityCount || RECENT_ACTIVITY_COUNT,
      );

      return UserProfileDto.assign(
        userProfile,
        recentActivity.data || [],
      ).hidePrivateFields(userId);
    } catch (error) {
      handleHttpRequestError(error);
    }
  }

  async createUserProfile(
    createDto: CreateUserProfileDto,
    userId: string,
  ): Promise<UserProfileDto> {
    const createdUserProfile = new this.userProfileModel({
      ...createDto,
      authId: userId,
      privateFields: createDto?.privateFields ?? new PrivateUserFieldsDto(),
    });
    try {
      const result = await createdUserProfile.save();
      return UserProfileDto.assign(result, null);
    } catch (error) {
      handleHttpRequestError(error);
    }
  }

  async patchUserProfile(
    patchDto: PatchUserProfileDto,
    userId: string,
  ): Promise<void> {
    try {
      const dto = cleanDtoFields(patchDto);
      const requestedDoc = await this.userProfileModel
        .findOne({ authId: userId })
        .exec();

      if (!requestedDoc) throw new MongooseError.DocumentNotFoundError(null);

      const privateFieldsKeys = Object.keys(new PrivateUserFieldsDto());
      const privateFieldsPath = getPrivateFieldsPropName();
      for (const key in dto) {
        if (privateFieldsKeys.includes(key)) {
          requestedDoc[privateFieldsPath][key] = dto[key];
          requestedDoc.markModified(privateFieldsPath);
        } else {
          requestedDoc[key] = dto[key];
        }
      }
      await requestedDoc.save();
    } catch (error) {
      handleHttpRequestError(error);
    }
  }

  async deleteUserProfile(userId: string): Promise<void> {
    try {
      const userProfile = await this.userProfileModel.findOne({
        authId: userId,
      });
      if (!userProfile) throw new MongooseError.DocumentNotFoundError(null);
      const result = await this.userProfileModel.findOneAndDelete({
        authId: userId,
      });
      if (!result) throw new MongooseError.DocumentNotFoundError(null);
    } catch (error) {
      handleHttpRequestError(error);
    }
  }

  async getRecentActivity(
    userId: string,
    count: string | number,
  ): Promise<DataTotalResponse<RecentActivity>> {
    try {
      const queryCount = typeof count !== 'number' ? parseInt(count) : count;
      if (!queryCount) throw new BadRequestException();
      const result: RecentActivity[] = [];

      const listsReq = this.userListsService.findMostRecentCreated(
        userId,
        5,
        ListType.Book,
      );
      const itemsReq = this.buliService.findMostRecentUpdated(
        userId,
        queryCount,
      );
      const complete = await Promise.all([listsReq, itemsReq]);

      const listsRes = complete[0];
      const itemsRes = complete[1];

      const includedCreatedLists: StringIdType[] = [];
      while ((listsRes.length || itemsRes.length) && result.length < 5) {
        if (listsRes[0] && itemsRes[0]) {
          const paddedListDate = new Date(
            listsRes[0].createdAt.getTime() + 200,
          );
          if (paddedListDate > itemsRes[0].updatedAt) {
            const userList = listsRes.shift();
            this.addUserListToResult(userList, result);
            includedCreatedLists.push(userList.id);
          } else {
            const buli = itemsRes.shift();
            if (!includedCreatedLists.includes(<Types.ObjectId>buli.userList)) {
              this.addBULIToResult(buli, result);
            }
          }
        } else {
          if (listsRes[0]) {
            const userList = listsRes.shift();
            this.addUserListToResult(userList, result);
            includedCreatedLists.push(userList.id);
          } else {
            const buli = itemsRes.shift();
            if (!includedCreatedLists.includes(<Types.ObjectId>buli.userList)) {
              this.addBULIToResult(buli, result);
            }
          }
        }
      }
      return new DataTotalResponse(result);
    } catch (error) {
      handleHttpRequestError(error);
    }
  }

  async getActiveLists(
    userId: string,
    count: string,
  ): Promise<DataTotalResponse<UserListDto>> {
    try {
      const queryCount = parseInt(count);
      if (!queryCount) throw new BadRequestException();

      const userLists = await this.userListsService.findMostRecentActive(
        userId,
        queryCount,
        ListType.Book,
      );

      return new DataTotalResponse(userLists);
    } catch (error) {
      handleHttpRequestError(error);
    }
  }

  private addUserListToResult(
    userList: UserListDto,
    result: RecentActivity[],
  ): void {
    result.push(
      new RecentUserListActivity(
        userList.id,
        ActivityType.start,
        userList.createdAt,
        (userList.list as ListDto).title,
        ((userList.list as ListDto).bookListItems as BookListItemDto[]).length,
      ),
    );
  }

  private addBULIToResult(buli: BULIDto, result: RecentActivity[]): void {
    result.push(
      new RecentBULIActivity(
        buli.userList as Types.ObjectId,
        ActivityType.progress,
        buli.updatedAt,
        buli.status,
        buli.owned,
        (buli.bookListItem as BookListItemDto).meta.title,
        buli.rating,
      ),
    );
  }
}
