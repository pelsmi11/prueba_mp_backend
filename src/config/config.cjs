require('dotenv').config();

const config = {
  env: process.env.MODE || 'dev',
  port: process.env.PORT || 3000,
  urlFrontend : process.env.URL_FRONTEND,

  dbUrl: `mssql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}?encrypt=${process.env.DB_ENCRYPT || 'false'}`,
  dbServer: process.env.DB_SERVER,
  dbUser:process.env.DB_USER,
  dbPassword:process.env.DB_PASSWORD,
  dbName:process.env.DB_NAME,

  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,

  sender:process.env.MAIL_SENDER,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT
}

module.exports = { config };
