import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export default oAuth2Client
