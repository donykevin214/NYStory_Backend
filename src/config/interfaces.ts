export type EnvVars = Partial<{
  PORT: number;
  HOST: string;
  APP_NAME: string;
  API_PREFIX: string;
  API_EXCLUDES: boolean;
  PUBLIC_URL: string;
  MORGAN_ENABLED: boolean;
  MORGAN_TYPE: string;
  CORS_ENABLED: boolean;
  NODE_ENV: string;
  CORS_ORIGIN: string;
  SECURITY_DELAY: number;
  SECURITY_MAX_TRIES: number;
  SECURITY_CODE_LENGTH: number;
  SECURITY_MAX_SENDS: number;
  SECURITY_TRY_DELAY: number;
  SECURITY_CODE_TTL: number;
  MEDIA_STRICT_MODE: boolean;
  NYT_APIKEY: string;
}>;

export type EnvKeys = keyof EnvVars;
