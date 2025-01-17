export interface EnvironmentVariables {
  PORT: number;
  DATABASE_URI: string;
  REDIS_URI: string;
  JWT_SECRET: string;
  WX_APP_ID: string;
  WX_APP_SECRET: string;
}

export interface AppConfig {
  port: number;
  database: {
    uri: string;
  };
  redis: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  wx: {
    appId: string;
    appSecret: string;
  };
}
