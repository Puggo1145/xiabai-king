import {
    Controller,
    // Get,
    Post,
    Body,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserOnlineStatusDto } from './dto/update-user-online-status.dto';
import { UpdateUserRoomDto } from './dto/update-user-room.dto';
import { UpdateGameStatsDto } from './dto/update-game-stats.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: '创建用户' })
    @ApiResponse({ status: HttpStatus.CREATED, description: '用户创建成功' })
    async create(@Body() createUserDto: CreateUserDto) {
        this.userService.createUser(createUserDto);
        return null;
    }

    // @Get('openid/:openid')
    // @ApiOperation({ summary: '通过 openid 获取用户信息' })
    // @ApiResponse({ status: HttpStatus.OK, description: '获取用户信息成功' })
    // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '用户不存在' })
    // async findByOpenid(@Param('openid') openid: string): Promise<UserDocument> {
    // }

    @Post('/update-online-status')
    @ApiOperation({ summary: '更新用户在线状态' })
    @ApiResponse({ status: HttpStatus.OK, description: '更新在线状态成功' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '用户不存在' })
    async updateOnlineStatus(@Body() updateUserOnlineStatusDto: UpdateUserOnlineStatusDto): Promise<boolean> {
        this.userService.updateUserOnlineStatus(updateUserOnlineStatusDto);
        return null;
    }

    @Post('/change-current-room')
    @ApiOperation({ summary: '更新用户当前房间' })
    @ApiResponse({ status: HttpStatus.OK, description: '更新当前房间成功' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '用户不存在' })
    async updateCurrentRoom(@Body() updateUserRoomDto: UpdateUserRoomDto): Promise<boolean> {
        this.userService.updateUserRoom(updateUserRoomDto);
        return null;
    }

    @Post('/update-game-stats')
    @ApiOperation({ summary: '更新游戏统计' })
    @ApiResponse({ status: HttpStatus.OK, description: '更新游戏统计成功' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '用户不存在' })
    async updateGameStats(@Body() updateGameStatsDto: UpdateGameStatsDto): Promise<boolean> {
        this.userService.updateGameStats(updateGameStatsDto);
        return null;
    }
}
