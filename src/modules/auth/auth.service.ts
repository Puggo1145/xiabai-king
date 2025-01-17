import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    private async validateWxUser(code: string) {
        // TODO: 微信接口获取 openid
        const openid = await this.getWxOpenid(code);
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

    private async getWxOpenid(code: string): Promise<string | null> {
        // TODO
        return code;
    }
}
