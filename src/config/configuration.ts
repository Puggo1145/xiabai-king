import type { AppConfig } from "@/types/config.interface";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/nonsense-king',
    },
    redis: {
        uri: process.env.REDIS_URI || 'redis://localhost:6379',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '48h',
    },
    wx: {
        appId: process.env.WX_APP_ID,
        appSecret: process.env.WX_APP_SECRET,
    },
} satisfies AppConfig);
