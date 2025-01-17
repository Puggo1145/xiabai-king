import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";
import type { DtoType } from "@/types/dto-type";

export class UpdateGameStatsDto extends UserOpenidDto {
    @ApiProperty({ description: '用户本场是否胜利' })
    @IsBoolean()
    readonly won: boolean
}

export type UpdateGameStatsParams = DtoType<UpdateGameStatsDto>;
