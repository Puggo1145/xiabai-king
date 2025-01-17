import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class WxSignInDto {
    @ApiProperty({ description: '用户登录凭证' })
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}
