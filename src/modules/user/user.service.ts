import { User, UserDocument } from '@/models/user.model';
import { Injectable } from '@nestjs/common';
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

    async createUser(createUserParams: CreateUserParams): Promise<UserDocument> {
        const user = new this.userModel(createUserParams);
        await user.save();
        return user;
    }

    async updateUserOnlineStatus({ openid, isOnline }: UpdateUserOnlineStatusParams): Promise<UserDocument | null> {
        return this.userModel.findOneAndUpdate(
            { openid },
            {
                isOnline,
                lastLoginAt: isOnline ? new Date() : undefined,
            },
            { new: true }
        ).exec();
    }

    async updateUserRoom({ openid, currentRoomId }: UpdateUserRoomParams): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(
            { openid },
            { currentRoomId },
            { new: true }
        ).exec();
    }

    async updateGameStats({
        openid,
        won
    }: UpdateGameStatsParams): Promise<UserDocument | null> {
        // 增加基础统计信息，游戏场次和相应角色场次
        const update = {
            $inc: {
                totalGames: 1,
            }
        };

        if (won) {
            Object.assign(update.$inc, { totalWins: 1 });
        }

        return this.userModel.findOneAndUpdate(
            { openid },
            update,
            { new: true }
        ).exec();
    }
}

