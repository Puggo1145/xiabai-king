import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";
import type { UserDocument } from "@/models/user.model";
import type { DtoType } from "@/types/dto-type";

export class UpdateUserOnlineStatusDto extends UserOpenidDto {
    @ApiProperty({ description: '用户的在线状态' })
    @IsBoolean()
    readonly isOnline: UserDocument['isOnline'];
}

export type UpdateUserOnlineStatusParams = DtoType<UpdateUserOnlineStatusDto>
