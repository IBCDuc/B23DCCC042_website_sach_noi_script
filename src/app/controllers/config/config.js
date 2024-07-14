
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const sqlConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    driver: process.env.DB_DRIVER,
    options: {
      trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true',
      enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
      encrypt: process.env.DB_ENCRYPT === 'true',
    },
     connectionString: 'DSN=SQL server1;'
  };
module.exports = sqlConfig