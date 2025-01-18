import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getWxOpenid } from '@/apis/wx';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    private async validateWxUser(code: string) {
        const openid = await getWxOpenid({
            code,
            appid: this.configService.get('WX_APP_ID'),
            appSecret: this.configService.get('WX_APP_SECRET')
        });
        const user = await this.userService.findByOpenid(openid);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }

    async wxSignIn(code: string) {
        const user = await this.validateWxUser(code);
        const payload = { openid: user.openid, sub: user.id }
        const access_token = this.jwtService.sign(payload)
        return { access_token }
    }
}
