const sql_config = require('../book_config.js')
const sql = require('mssql/msnodesqlv8');
async function connect() {
    try {
        await sql.connect(sql_config);
        const result = await sql.query`SELECT *
        FROM [Book].[dbo].[Books]
        `;
        return result.recordset

        // Successfully connected and queried
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.close();
    }
}
module.exports = { connect }