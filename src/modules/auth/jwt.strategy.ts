import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            // 从 Authorization header 中提取 Bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            ignoreExpiration: false,

            // JWT 签名密钥
            secretOrKey: configService.get<string>('jwt.secret'),
            
            // 将请求对象传递给回调
            passReqToCallback: true
        })
    }

    async validate(payload: any) {
        return { openid: payload.openid }
    }
}
