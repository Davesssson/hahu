import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export const EnvironmentVariables = {
  bail: parseInt(process.env.BAIL || '0', 10),
  specFileRetries: parseInt(process.env.SPEC_FILE_RETRIES || '0', 10),
  configSpecs: process.env.CONFIG_SPECS || 'failed_to_initialize_CONFIG_SPECS',
  logLevel: process.env.LOG_LEVEL || 'debug',
  waitForTimeout: parseInt(process.env.WAITFOR_TIMEOUT || '0', 10),
  waitForInterval: parseInt(process.env.WAITFOR_INTERVAL || '0', 10),

  user_email: process.env.USER_EMAIL || '',
  user_password: process.env.USER_PASSWORD || '',

  hahuRegisterUrl: process.env.HAHU_REGISTER_URL || '',
  hahuHomeUrl: process.env.HAHU_HOME_URL || '',
  hahuListingUrl: process.env.HAHU_LISTING_URL || '',
  hahuParkingLotUrl: process.env.HAHU_PARKING_LOT_URL || '',
};
