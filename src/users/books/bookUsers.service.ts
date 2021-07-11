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
import { ListsService } from 'src/lists/lists.service';
import { BULIService } from 'src/userListItems/books/buli.service';
import { BULIDto } from 'src/userListItems/books/definitions/buli.dto';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserListsService } from 'src/userLists/userLists.service';
import { ActivityType } from '../definitions/activityType';
import {
  RecentActivity,
  RecentBULIActivity,
  RecentListActivity,
  RecentUserListActivity,
} from '../definitions/recentActivity';
import { UserStatistics } from '../definitions/statistics/userStatistics';
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
    private readonly listsService: ListsService,
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

      const recentActivity = await this.getRecentActivity(userId, userProfile);

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

  async getUserStatistics(
    authId: string,
    userId: string,
  ): Promise<UserStatistics | null> {
    const isStatisticsOwner = authId == userId;
    try {
      const userProfileSettings = await this.getUserProfileSettings(authId);
      if (
        !userProfileSettings ||
        (!isStatisticsOwner && !userProfileSettings.publiclyShowUserStatistics)
      ) {
        return null;
      }

      const requests: any[] = [
        this.buliService.getAggregateItemStatistics(authId),
      ];

      if (isStatisticsOwner) {
        requests.push(this.listsService.getAllListsByUser(authId));
      } else {
        requests.push(this.listsService.getPublicListsByUser(authId));
      }

      const [userItemStatistics, listsByUser] = await Promise.all(requests);
      return {
        ...userItemStatistics,
        listCount: listsByUser.length,
      };
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
    userProfile: UserProfile,
  ): Promise<DataTotalResponse<RecentActivity>> {
    try {
      if (!userProfile) throw new BadRequestException();
      const {
        authId,
        privateFields: { recentActivityCount, showActivityOnPublicProfile },
      } = userProfile;
      const count = recentActivityCount || RECENT_ACTIVITY_COUNT;
      const isOwnProfile = userId == authId;
      const result: RecentActivity[] = [];
      const requests: Promise<any>[] = [];

      requests.push(
        this.listsService.findMostRecentCreated(authId, count, isOwnProfile),
      );
      requests.push(
        this.listsService.findMostRecentUpdated(authId, count, isOwnProfile),
      );

      if (showActivityOnPublicProfile || isOwnProfile) {
        requests.push(
          this.userListsService.findMostRecentCreated(
            authId,
            count,
            ListType.Book,
          ),
        );
        requests.push(this.buliService.findMostRecentUpdated(authId, count));
      }

      const completed = await Promise.all(requests);

      const createdListsRes: ListDto[] = completed[0];
      const updatedListsRes: ListDto[] = completed[1];

      const processedListIds: Types.ObjectId[] = [];

      while (createdListsRes.length || updatedListsRes.length) {
        const currentCreatedList = createdListsRes[0];
        const currentUpdatedList = updatedListsRes[0];
        const listsToAdd: {
          addedList: ListDto;
          type: ActivityType.createdList | ActivityType.updatedList;
          source: ListDto[];
        }[] = [];
        // only one entry for each list id
        if (
          currentCreatedList &&
          processedListIds.some(id => id.equals(currentCreatedList.id))
        ) {
          createdListsRes.shift();
          continue;
        } else if (
          currentUpdatedList &&
          processedListIds.some(id => id.equals(currentUpdatedList.id))
        ) {
          updatedListsRes.shift();
          continue;
        }

        // if both exist
        if (currentCreatedList && currentUpdatedList) {
          // and they represent the same list
          if (currentCreatedList.id.equals(currentUpdatedList.id)) {
            const paddedCreatedTime = new Date(
              currentCreatedList.createdAt.getTime() + 200,
            );
            const paddedUpdatedTime = new Date(
              currentUpdatedList.updatedAt.getTime() + 200,
            );

            // if they happened around the same time (possibly same operation) use the created one
            if (
              Math.abs(
                paddedCreatedTime.getUTCMilliseconds() -
                  paddedUpdatedTime.getUTCMilliseconds(),
              ) < 500
            ) {
              listsToAdd.push({
                addedList: currentCreatedList,
                type: ActivityType.createdList,
                source: createdListsRes,
              });
              processedListIds.push(currentCreatedList.id);
            } else {
              // otherwise use the most recent
              if (paddedCreatedTime >= paddedUpdatedTime) {
                listsToAdd.push({
                  addedList: currentCreatedList,
                  type: ActivityType.createdList,
                  source: createdListsRes,
                });
                processedListIds.push(currentCreatedList.id);
              } else {
                listsToAdd.push({
                  addedList: currentUpdatedList,
                  type: ActivityType.updatedList,
                  source: updatedListsRes,
                });
                processedListIds.push(currentUpdatedList.id);
              }
            }
          } else {
            // use both
            listsToAdd.push(
              {
                addedList: currentCreatedList,
                type: ActivityType.createdList,
                source: createdListsRes,
              },
              {
                addedList: currentUpdatedList,
                type: ActivityType.updatedList,
                source: updatedListsRes,
              },
            );
            processedListIds.push(currentCreatedList.id, currentUpdatedList.id);
          }
        } else {
          // use whichever exists
          if (currentCreatedList) {
            listsToAdd.push({
              addedList: currentCreatedList,
              type: ActivityType.createdList,
              source: createdListsRes,
            });
            processedListIds.push(currentCreatedList.id);
          } else if (currentUpdatedList) {
            listsToAdd.push({
              addedList: currentUpdatedList,
              type: ActivityType.updatedList,
              source: updatedListsRes,
            });
            processedListIds.push(currentUpdatedList.id);
          }
        }

        listsToAdd.forEach(({ addedList, type, source }) => {
          this.addListToResult(addedList, type, result);
          source.shift();
        });
      }

      if (showActivityOnPublicProfile) {
        const userListsRes = completed[2];
        const itemsRes = completed[3];
        const includedCreatedUserLists: StringIdType[] = [];
        while (userListsRes.length || itemsRes.length) {
          if (userListsRes[0] && itemsRes[0]) {
            const paddedListDate = new Date(
              userListsRes[0].createdAt.getTime() + 200,
            );
            if (paddedListDate > itemsRes[0].updatedAt) {
              const userList = userListsRes.shift();
              this.addUserListToResult(userList, result);
              includedCreatedUserLists.push(userList.id);
            } else {
              const buli = itemsRes.shift();
              if (
                !includedCreatedUserLists.includes(
                  <Types.ObjectId>buli.userList,
                )
              ) {
                this.addBULIToResult(buli, result);
              }
            }
          } else {
            if (userListsRes[0]) {
              const userList = userListsRes.shift();
              this.addUserListToResult(userList, result);
              includedCreatedUserLists.push(userList.id);
            } else {
              const buli = itemsRes.shift();
              if (
                !includedCreatedUserLists.includes(
                  <Types.ObjectId>buli.userList,
                )
              ) {
                this.addBULIToResult(buli, result);
              }
            }
          }
        }
      }

      const sortedAndTrimmedResult = result
        .sort(
          (a, b) =>
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime(),
        )
        .slice(0, count);

      return new DataTotalResponse(sortedAndTrimmedResult);
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

  private async getUserProfileSettings(
    authId: string,
  ): Promise<PrivateUserFieldsDto> {
    try {
      const userProfile = await this.userProfileModel
        .findOne({ authId })
        .populate(getUserProfileListCountPropName());

      if (!userProfile) throw new MongooseError.DocumentNotFoundError(null);

      return UserProfileDto.assign(userProfile, null).privateFields;
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

  private addListToResult(
    list: ListDto,
    activityType: ActivityType.createdList | ActivityType.updatedList,
    result: RecentActivity[],
  ): void {
    const timeStamp =
      activityType === ActivityType.createdList
        ? list.createdAt
        : list.updatedAt;
    result.push(
      new RecentListActivity(list.id, activityType, timeStamp, list.title),
    );
  }
}
