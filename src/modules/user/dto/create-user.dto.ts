import { IsString, IsOptional, IsUrl, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserOpenidDto } from "./base-user.dto";
import type { DtoType } from '@/types/dto-type';
import type { UserDocument } from "@/models/user.model";

export class CreateUserDto extends UserOpenidDto {
    @ApiProperty({ description: '用户名' })
    @IsString()
    @IsNotEmpty()
    readonly username: UserDocument['username'];

    @ApiProperty({ description: '头像 URL', required: false })
    @IsOptional()
    @IsUrl()
    readonly avatarUrl?: UserDocument['avatarUrl'];
}

export type CreateUserParams = DtoType<CreateUserDto>
