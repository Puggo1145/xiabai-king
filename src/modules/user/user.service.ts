import { User, UserDocument } from '@/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserOnlineStatusDto } from './dto/update-user-online-status.dto';
import { UpdateUserRoomDto } from './dto/update-user-room.dto';
import { UpdateGameStatsDto } from './dto/update-game-stats.dto';

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

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const user = new this.userModel(createUserDto);
        await user.save();
        return user;
    }

    async updateUserOnlineStatus({ openid, isOnline }: UpdateUserOnlineStatusDto): Promise<UserDocument | null> {
        return this.userModel.findOneAndUpdate(
            { openid },
            {
                isOnline,
                lastLoginAt: isOnline ? new Date() : undefined,
            },
            { new: true }
        ).exec();
    }

    async updateUserRoom({ openid, currentRoomId }: UpdateUserRoomDto): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(
            { openid },
            { currentRoomId },
            { new: true }
        ).exec();
    }

    async updateGameStats({
        openid,
        won
    }: UpdateGameStatsDto): Promise<UserDocument | null> {
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

