import { CorsOptionsDelegate } from 'cors';

import { get } from './tools';
import { Request } from 'express';

const publicUrl = get('PUBLIC_URL');

export default {
  env: get('NODE_ENV'),
  mediaStrictMode: get('MEDIA_STRICT_MODE'),
  port: get('PORT'),
  prefix: get('API_PREFIX'),
  apiExcludes: get('API_EXCLUDES'),
  host: get('HOST'),
  appName: get('APP_NAME'),
  publicUrl,
  domain: new URL(publicUrl).host,
  nytApiKey: get('NYT_APIKEY'),
  morgan: {
    enabled: get('MORGAN_ENABLED'),
    type: get('MORGAN_TYPE'),
  },
  cors: {
    enabled: get('CORS_ENABLED'),
    options(req: Request, done) {
      const value = get('CORS_ORIGIN');
      const origin = req.get('origin');

      if (value === '*') return done(null, { origin: '*' });

      if (!origin) return done(null, { origin: false });

      const whitelist: string[] = value.split(',');
      const found = whitelist.find((o) => origin.startsWith(o));
      return done(null, { origin: !!found });
    },
  } as {
    enabled: boolean;
    options: CorsOptionsDelegate;
  },
  security: {
    code: {
      min: 10 ** (get('SECURITY_CODE_LENGTH') - 1),
      max: 10 ** get('SECURITY_CODE_LENGTH') - 1,
      delay: get('SECURITY_DELAY'),
      tryDelay: get('SECURITY_TRY_DELAY'),
      ttl: get('SECURITY_CODE_TTL'),
      maxTries: get('SECURITY_MAX_TRIES'),
      maxSends: get('SECURITY_MAX_SENDS'),
    },
  },
};
