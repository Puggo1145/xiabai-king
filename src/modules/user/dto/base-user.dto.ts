import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { UserDocument } from "@/models/user.model";
import type { DtoType } from '@/types/dto-type';

export class UserOpenidDto {
    @ApiProperty({ description: '微信 openid' })
    @IsString({ message: 'openid 格式错误' })
    @IsNotEmpty({ message: 'openid 不能为空' })
    readonly openid: UserDocument['openid'];
}

export type UserOpenidParams = DtoType<UserOpenidDto>
