import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";
import type { UserDocument } from "@/models/user.model";

export class UpdateUserOnlineStatusDto extends UserOpenidDto {
    @ApiProperty({ description: '用户的在线状态' })
    @IsBoolean()
    isOnline: UserDocument['isOnline'];
}
