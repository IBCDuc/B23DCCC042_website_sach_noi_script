
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const sqlConfig2 = {
    server: process.env.DB2_SERVER,
    database: process.env.DB2_DATABASE,
    driver: process.env.DB2_DRIVER,
    options: {
      trustedConnection: process.env.DB2_TRUSTED_CONNECTION === 'true',
      enableArithAbort: process.env.DB2_ENABLE_ARITH_ABORT === 'true',
      encrypt: process.env.DB2_ENCRYPT === 'true',
    },
     connectionString: 'DSN=SQL server1;'
  };
module.exports = sqlConfig2