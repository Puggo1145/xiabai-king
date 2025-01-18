import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";
import type { UserDocument } from "@/models/user.model";
import type { DtoType } from "@/types/dto-type";

export class UpdateUserRoomDto extends UserOpenidDto {
    @ApiProperty({ description: '用户当前所在房间 id' })
    @IsString({ message: 'currentRoomId 格式错误' })
    @IsNotEmpty({ message: 'currentRoomId 不能为空' })
    readonly currentRoomId: UserDocument['currentRoomId']
}

export type UpdateUserRoomParams = DtoType<UpdateUserRoomDto>;
