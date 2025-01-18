import { URLSearchParams } from "url";
import { HttpException, HttpStatus } from "@nestjs/common";

const apiPrefix = 'https://api.weixin.qq.com';

interface WxOpenidParams {
    appid: string;
    appSecret: string;
    code: string;
}
interface WxOpenidResponse {
    session_key: string;
    unionid: string;
    errmsg: string;
    errcode: number;
    openid: string;
}

export const getWxOpenid = async (params: WxOpenidParams): Promise<WxOpenidResponse['openid']> => {
    try {
        const urlParams = new URLSearchParams({
            appid: params.appid,
            secret: params.appSecret,
            js_code: params.code,
            grant_type: 'authorization_code'
        });

        const res = await fetch(`${apiPrefix}/sns/jscode2session?${urlParams.toString()}`);
        if (!res.ok) {
            throw new HttpException(`Wechat API request failed`, HttpStatus.BAD_GATEWAY);
        }
        
        const data: WxOpenidResponse = await res.json();

        if (data.errcode !== 0) {
            throw new HttpException(
                data.errmsg || 'Wechat API request failed', 
                HttpStatus.BAD_REQUEST
            );
        }

        return data.openid;
    } catch (err: any) {
        if (!(err instanceof HttpException)) {
            throw new HttpException(
                'Wechat API request failed', 
                HttpStatus.BAD_GATEWAY
            );
        }

        throw err;
    }
}