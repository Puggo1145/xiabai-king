import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id
            delete ret.__v

            return ret
        }
    }
})
export class User {
    @Prop({
        required: true,
        unique: true
    })
    openid: string

    @Prop({ required: true })
    username: string

    @Prop()
    avatarUrl: string;

    @Prop({ default: 0 })
    totalGames: number;

    @Prop({ default: 0 })
    totalWins: number;

    @Prop({ default: 0 })
    totalScore: number;

    @Prop({ default: false })
    isOnline: boolean;
  
    @Prop({ default: null })
    currentRoomId: string | null;
  
    @Prop({ default: Date.now })
    lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// 添加索引
UserSchema.index({ openid: 1 }, { unique: true });
UserSchema.index({ isOnline: 1 });
UserSchema.index({ currentRoomId: 1 });
