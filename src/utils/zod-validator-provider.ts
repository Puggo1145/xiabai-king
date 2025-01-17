import { z } from 'zod';

export const createZodValidationProvider = (schema: z.ZodType) => {    
    return (config: Record<string, unknown>) => {
        const result = schema.safeParse(config);
        if (result.success) {
            return result.data;
        }
        throw new Error(result.error.message);
    };
};