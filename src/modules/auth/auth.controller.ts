import { 
    Controller, 
    HttpStatus, 
    Post, 
    Body 
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { WxSignInDto } from './dto/wx-sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('wx/sign-in')
    @ApiOperation({ summary: '微信小程序登录' })
    @ApiResponse({ status: HttpStatus.OK, description: '登录成功' })
    async wxSignIn(@Body() { code }: WxSignInDto): Promise<{ access_token: string }> {
        return await this.authService.wxSignIn(code);
    }
}
