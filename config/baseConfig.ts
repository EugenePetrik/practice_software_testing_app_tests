import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { IBaseConfig } from '../typings/global';

dotenvConfig({
  path: join(process.cwd(), '.env'),
});

export const baseConfig: IBaseConfig = {
  WEB_URL: process.env.WEB_URL!,
  API_URL: process.env.API_URL!,
  USER_EMAIL: process.env.USER_EMAIL!,
  USER_PASSWORD: process.env.USER_PASSWORD!,
  USER_NAME: process.env.USER_NAME!,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL!,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
  ADMIN_NAME: process.env.ADMIN_NAME!,
  CI: !!process.env.CI,
};
