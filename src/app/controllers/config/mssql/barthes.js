const sql_config = require('../config.js')
const sql = require('mssql/msnodesqlv8');
async function connect() {
    try {
        await sql.connect(sql_config);
        const result = await sql.query`SELECT *
        FROM [Book].[dbo].[Books] where author = 'Roland Barthes' `;
        return result.recordset

        // Successfully connected and queried
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.close();
    }
}
module.exports = { connect }