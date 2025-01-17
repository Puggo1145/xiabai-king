import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";

export class UpdateGameStatsDto extends UserOpenidDto {
    @ApiProperty({ description: '用户本场是否胜利' })
    @IsBoolean()
    won: boolean
}
