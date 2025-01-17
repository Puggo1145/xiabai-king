import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";
import type { UserDocument } from "@/models/user.model";
import type { DtoType } from "@/types/dto-type";

export class UpdateUserRoomDto extends UserOpenidDto {
    @ApiProperty({ description: '用户当前所在房间 id' })
    @IsString()
    @IsNotEmpty()
    readonly currentRoomId: UserDocument['currentRoomId']
}

export type UpdateUserRoomParams = DtoType<UpdateUserRoomDto>;
