import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export const EnvironmentVariables = {
  user_email: process.env.USER_EMAIL || '',
  user_password: process.env.USER_PASSWORD || '',

  hahuRegisterUrl: process.env.HAHU_REGISTER_URL || '',
  hahuHomeUrl: process.env.HAHU_HOME_URL || '',
  hahuListingUrl: process.env.HAHU_LISTING_URL || '',
  hahuParkingLotUrl: process.env.HAHU_PARKING_LOT_URL || '',
};

