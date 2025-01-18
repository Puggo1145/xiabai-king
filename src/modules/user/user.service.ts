import { User, UserDocument } from '@/models/user.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserParams } from './dto/create-user.dto';
import { UpdateUserOnlineStatusParams } from './dto/update-user-online-status.dto';
import { UpdateUserRoomParams } from './dto/update-user-room.dto';
import { UpdateGameStatsParams } from './dto/update-game-stats.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    /**
     * @description 根据openid查找用户
     * @param openid 微信openid
     * @returns 查询到的用户
     */
    async findByOpenid(openid: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ openid }).exec();
    }

    /**
     * @description 创建用户
     * @param createUserParams 创建用户参数
     */
    async createUser(createUserParams: CreateUserParams): Promise<void> {
        const user = new this.userModel(createUserParams);
        await user.save();
    }

    /**
     * @description 更新用户在线状态
     * @param openid 微信openid
     * @param isOnline 是否在线
     */
    async updateUserOnlineStatus({ openid, isOnline }: UpdateUserOnlineStatusParams): Promise<void> {
        const res = await this.userModel.findOneAndUpdate(
            { openid },
            {
                isOnline,
                lastLoginAt: isOnline ? new Date() : undefined,
            },
            { new: true }
        ).exec();

        if (!res) {
            throw new BadRequestException('User not found');
        }
    }

    /**
     * @description 更新用户房间
     * @param openid 微信openid
     * @param currentRoomId 当前房间id
     */
    async updateUserRoom({ openid, currentRoomId }: UpdateUserRoomParams): Promise<void> {
        const res = await this.userModel.findOneAndUpdate(
            { openid },
            { currentRoomId },
            { new: true }
        ).exec();

        if (!res) {
            throw new BadRequestException('User not found');
        }
    }

    /**
     * @description 更新用户游戏统计信息
     * @param openid 微信openid
     * @param won 是否获胜
     */
    async updateGameStats({
        openid,
        won
    }: UpdateGameStatsParams): Promise<void> {
        // 增加基础统计信息，游戏场次和相应角色场次
        const update = {
            $inc: {
                totalGames: 1,
            }
        };

        if (won) {
            Object.assign(update.$inc, { totalWins: 1 });
        }

        const res = await this.userModel.findOneAndUpdate(
            { openid },
            update,
            { new: true }
        ).exec();

        if (!res) {
            throw new BadRequestException('User not found');
        }
    }
}

