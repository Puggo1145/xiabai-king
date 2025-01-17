import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfigValidationSchema } from './validation/app-config.validation';
import { createZodValidationProvider } from './utils/zod-validator-provider';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [
        process.env.NODE_ENV === 'development' 
          ? '.env.development' 
          : '.env.production'
      ],
      validate: createZodValidationProvider(appConfigValidationSchema),
      validationOptions: {
        allowUnknown: true,  // 允许未知的环境变量
        abortEarly: true, // 发现第一个错误就停止
      }
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nonsense-king',
      }),
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
