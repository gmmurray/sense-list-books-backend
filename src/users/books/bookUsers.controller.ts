import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserPermissions } from 'src/authz/ApiPermissions';
import { AuthRequest } from 'src/authz/authzUser';
import { Permissions } from 'src/authz/permissions.decorator';
import { PermissionsGuard } from 'src/authz/permissions.guard';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import {
  CreateUserProfileDto,
  PatchUserProfileDto,
  UserProfileDto,
} from '../definitions/userProfiles/userProfile.dto';
import { BookUsersService } from './bookUsers.service';

@Controller('books/users')
export class BookUsersController {
  constructor(private readonly bookUsersService: BookUsersService) {}

  //#region profiles

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('profiles/:authId')
  @Permissions(UserPermissions.read)
  async getUserProfileByAuthId(
    @Req() { user }: AuthRequest,
    @Param('authId') authId: string,
  ): Promise<UserProfileDto> {
    const userId = user.sub;
    return await this.bookUsersService.findUserProfile(authId, userId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post('profiles')
  @Permissions(UserPermissions.write)
  async createUserProfile(
    @Req() { user }: AuthRequest,
    @Body() createDto: CreateUserProfileDto,
  ): Promise<UserProfileDto> {
    const userId = user.sub;
    return await this.bookUsersService.createUserProfile(
      { ...createDto, authId: userId },
      userId,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch('profiles')
  @Permissions(UserPermissions.write)
  async patchUserProfile(
    @Req() { user }: AuthRequest,
    @Body() updates: PatchUserProfileDto,
  ): Promise<void> {
    const userId = user.sub;
    return await this.bookUsersService.patchUserProfile(updates, userId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete('profiles')
  @Permissions(UserPermissions.delete)
  async deleteUserProfile(@Req() { user }: AuthRequest): Promise<void> {
    const userId = user.sub;
    return await this.bookUsersService.deleteUserProfile(userId);
  }

  //#endregion

  //#region activity

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('active-lists/:count')
  @Permissions(UserPermissions.read)
  async getActiveLists(
    @Req() { user }: AuthRequest,
    @Param('count') count: string,
  ): Promise<DataTotalResponse<UserListDto>> {
    const userId = user.sub;
    return await this.bookUsersService.getActiveLists(userId, count);
  }

  //#endregion
}
