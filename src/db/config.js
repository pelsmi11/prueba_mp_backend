import { config } from './../config/config.cjs';

export default {
  "development": {
    "username": config.dbUser,
    "password": config.dbPassword,
    "database": config.dbName,
    "host": config.dbServer,
    "dialect": "mssql",
    "options": {
      "encrypt": false,
      "trustServerCertificate": true
    }
  },
  "test": {
    "username": "your_username",
    "password": "your_password",
    "database": "your_database_test",
    "host": "127.0.0.1",
    "dialect": "mssql",
    "options": {
      "encrypt": false,
      "trustServerCertificate": true
    }
  },
  "production": {
    "username": "your_username",
    "password": "your_password",
    "database": "your_database_production",
    "host": "127.0.0.1",
    "dialect": "mssql",
    "options": {
      "encrypt": false,
      "trustServerCertificate": true
    }
  }
}
