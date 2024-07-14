const sql_config = require('../config.js')
const sql = require('mssql/msnodesqlv8');
async function connect() {
    try {
        await sql.connect(sql_config);
        const result = await sql.query`SELECT *
        FROM [User].[dbo].[User_info] `;
        return result.recordset

        // Successfully connected and queried
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.close();
    }
}
module.exports = { connect }