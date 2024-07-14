const db_user = require("./config/mssql/user_all.js")
const db_config = require("./config/config.js")
const sql = require('mssql/msnodesqlv8');

class UserController {
    async user(req , res) {
        const result = await db_user.connect()
        res.render("user" , {layout : 'lms' , user: result})
      }
      async adduser(req , res) {
        const result = await db_user.connect()
        res.render("adduser" , {layout : 'lms' , user: result})
      }
      async deleteuser(req , res) {

        const id = req.params.id
        const pool = await sql.connect(db_config);
        const request = pool.request()
        request.input('id' , sql.NVarChar, id)

        const result = await request.query`Delete 
        FROM [User].[dbo].[User_info] 
        where id = @id`;

        res.redirect('/user')
      }
      async updateuser(req , res) {

        const id = req.params.id
        const pool = await sql.connect(db_config);
        const request = pool.request()
        request.input('id' , sql.NVarChar, id)

        const result = await request.query` SELECT *
        FROM [User].[dbo].[User_info]
        where id = @id`;

        res.render("updateuser" , {layout : 'lms' , user: result.recordset })
      }


}

module.exports = new UserController();