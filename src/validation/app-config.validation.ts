import { z } from 'zod';

export const appConfigValidationSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URI: z.string(),
    REDIS_URI: z.string(),
    JWT_SECRET: z.string(),
    WX_APP_ID: z.string(),
    WX_APP_SECRET: z.string(),
});

export type AppConfigType = z.infer<typeof appConfigValidationSchema>;
