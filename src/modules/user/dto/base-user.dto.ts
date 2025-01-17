import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { UserDocument } from "@/models/user.model";

export class UserOpenidDto {
    @ApiProperty({ description: '微信 openid' })
    @IsString()
    @IsNotEmpty()
    readonly openid: UserDocument['openid'];
}
