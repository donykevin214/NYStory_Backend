import { EnvKeys } from './interfaces';
import dotenv from 'dotenv';
export type VariableValue = string | boolean | number;

export type GVariable<T extends VariableValue> = {
  defaultValue?: T;
  group?: string;
  log?: boolean;
  description?: string;
  name: string;
};

export type StringVariable = GVariable<string> & {
  type: 'string';
};

export type BooleanVariable = GVariable<boolean> & {
  type: 'boolean';
};

export type NumberVariable = GVariable<number> & {
  type: 'number';
};

export type Variable = StringVariable | BooleanVariable | NumberVariable;

dotenv.config({
  path: '.env/.common.env',
});

dotenv.config({
  path: `.env/.${process.env.NODE_ENV || 'development'}.env`,
});

const ENV = process.env.NODE_ENV || 'development';

const variables: Record<EnvKeys, Variable> = {
  NODE_ENV: {
    name: 'Env Type',
    type: 'string',
    defaultValue: 'local',
  },
  MEDIA_STRICT_MODE: {
    name: 'Strict Mode',
    group: 'app',
    type: 'boolean',
    defaultValue: true,
  },
  /**
   * App
   */
  PORT: {
    name: 'Port',
    type: 'number',
    defaultValue: 3000,
  },
  API_PREFIX: {
    name: 'API Prefix',
    type: 'string',
    defaultValue: 'api',
  },
  API_EXCLUDES: {
    name: 'Enable API Excludes',
    defaultValue: true,
    type: 'boolean',
  },
  PUBLIC_URL: {
    type: 'string',
    name: 'Public URL',
    defaultValue: `http://localhost:${process.env.PORT || 3000}`,
  },
  HOST: {
    type: 'string',
    name: 'Host',
    defaultValue: '0.0.0.0',
  },
  APP_NAME: {
    type: 'string',
    name: 'App Name',
    defaultValue: 'TopStory',
  },
  CORS_ORIGIN: {
    type: 'string',
    name: 'Origin',
    group: 'CORS',
    defaultValue: '*',
  },
  CORS_ENABLED: {
    name: 'Enabled',
    group: 'CORS',
    defaultValue: false,
    type: 'boolean',
  },
  MORGAN_ENABLED: {
    name: 'Enable logging',
    group: 'morgan',
    defaultValue: false,
    type: 'boolean',
  },
  MORGAN_TYPE: {
    type: 'string',
    name: 'Type',
    group: 'morgan',
    defaultValue: 'dev',
  },

  /**
   * Security
   */
  SECURITY_DELAY: {
    name: 'Delay',
    group: 'security',
    type: 'number',
    defaultValue: 30000,
  },
  SECURITY_MAX_TRIES: {
    name: 'Max Tries',
    group: 'security',
    type: 'number',
    defaultValue: 5,
  },
  SECURITY_CODE_LENGTH: {
    name: 'Code Length',
    group: 'security',
    defaultValue: 6,
    type: 'number',
  },
  SECURITY_MAX_SENDS: {
    name: 'Max Resends',
    group: 'Security',
    defaultValue: 5,
    type: 'number',
  },
  SECURITY_TRY_DELAY: {
    name: 'Retry Delay',
    group: 'Security',
    defaultValue: 5000, // 5s
    type: 'number',
  },
  SECURITY_CODE_TTL: {
    name: 'Verification Delay',
    group: 'Security',
    defaultValue: 7200000, // 2h
    type: 'number',
  },

  /**
   * NY times API key
   */
  NYT_APIKEY: {
    name: 'NYT APIKEY',
    group: 'NY times',
    type: 'string',
  },
} as const;

export default variables;
