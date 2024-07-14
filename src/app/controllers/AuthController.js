const sql_config = require("./config/config.js");
const sql = require("mssql/msnodesqlv8");
const db_user = require("./config/mssql/user_all.js")
class AuthController {
  signup(req, res) {
    const { name, email, password } = req.body;
    sql.connect(sql_config, (err) => {
      if (err) {
        console.error("Kết nối đến cơ sở dữ liệu thất bại:", err);
        return res.status(500).send("Lỗi kết nối đến cơ sở dữ liệu");
      }
      //console.log('Kết nối đến cơ sở dữ liệu thành công');
      else {
        const request = new sql.Request();
        const email_check = `SELECT EMAIL FROM [User].[dbo].[User_info] WHERE EMAIL = '${email}' `;
        request.query(email_check, (err, result) => {
          request.query(email_check, (err, result) => {
            if (result.recordset.length > 0) {
              console.log("Email found:", result.recordset[0].EMAIL);
              
              return res.render("signup", {
                layout: "signup",
                message: "That email is already use",
              });
            } else {
              const request = new sql.Request();
              const query = `INSERT INTO [User].[dbo].[User_info] (name , email, password) VALUES ('${name}', '${email}', '${password}')`;
              request.query(query, (err, result) => {
                if (err) {
                  console.error("Lỗi thêm người dùng vào cơ sở dữ liệu:", err);
                  return res
                    .status(500)
                    .send("Lỗi thêm người dùng vào cơ sở dữ liệu");
                }
                return res.render("signup", {
                  layout: "signup",
                  message: "Registered successfully",
                });
                //console.log('Người dùng được thêm vào cơ sở dữ liệu thành công');
              });
            }
          });
        });
      }
      //console.log('Người dùng được thêm vào cơ sở dữ liệu thành công');
    });
  }
  //login 
  login(req , res ) {
    const {email , password} = req.body 
    sql.connect(sql_config , (err , result) => {
        const request = new sql.Request()
        const email_check = `SELECT EMAIL , PASSWORD FROM [USER].[dbo].[User_info] WHERE EMAIL = '${email}' and PASSWORD = '${password}'`
        const admin_check = `SELECT EMAIL , PASSWORD FROM [USER].[dbo].[Admin_user] WHERE EMAIL = '${email}' and PASSWORD = '${password}'`
        request.query(email_check , (err , result) => {
            if (result.recordset.length > 0 ) {
                res.redirect('/books')
            } else {
              request.query(admin_check , (err , result) => {
                if (result.recordset.length > 0 ) {
                    res.redirect('/lms')
            } else {
              res.render("login", {
                layout: "login",
                message: "Account does not exist, please log in",
              });
            }
        })
            }
    })
  })
  }
  //them sach
  addbook(req , res) {
    const { name, email, password } = req.body;
    sql.connect(sql_config, (err) => {
      if (err) {
        console.error("Kết nối đến cơ sở dữ liệu thất bại:", err);
        return res.status(500).send("Lỗi kết nối đến cơ sở dữ liệu");
      }
      //console.log('Kết nối đến cơ sở dữ liệu thành công');
      else {
        const request = new sql.Request();
        const email_check = `SELECT EMAIL FROM [User].[dbo].[User_info] WHERE EMAIL = '${email}' `;
        request.query(email_check, (err, result) => {
          request.query(email_check, (err, result) => {
            if (result.recordset.length > 0) {
              console.log("Email found:", result.recordset[0].EMAIL);
              
              return res.render("adduser", {
                layout: "lms",
                message: "That email is already use",
              });
            } else {
              const request = new sql.Request();
              const query = `INSERT INTO [User].[dbo].[User_info] (name , email, password) VALUES ('${name}', '${email}', '${password}')`;
              request.query(query, (err, result) => {
                if (err) {
                  console.error("Lỗi thêm người dùng vào cơ sở dữ liệu:", err);
                  return res
                    .status(500)
                    .send("Lỗi thêm người dùng vào cơ sở dữ liệu");
                }
                return res.render("adduser", {
                  layout: "lms",
                  message: "Registered successfully",
                });
                //console.log('Người dùng được thêm vào cơ sở dữ liệu thành công');
              });
            }
          });
        });
      }
      //console.log('Người dùng được thêm vào cơ sở dữ liệu thành công');
    });
  }
  async updateuser(req , res) {
    const result2 = await db_user.connect()
    const {id ,  name, email, password } = req.body;
    
    sql.connect(sql_config, (err) => {
      if (err) {
        console.error("Kết nối đến cơ sở dữ liệu thất bại:", err);
        return res.status(500).send("Lỗi kết nối đến cơ sở dữ liệu");
      }
      
      else {
        
        const request = new sql.Request();
        const email_check = `SELECT email FROM [User].[dbo].[User_info] WHERE EMAIL = '${email}' `;
        request.query(email_check, (err, result) => {
          request.query(email_check, (err, result) => {
            if (result.recordset.length > 0) {
              
              
              return res.render("user", {
                layout: "lms",
                user: result2,
                message: "email đã tồn tại",
              });
            } else {
              const request = new sql.Request();
              request.input('id' , sql.NVarChar, email_check)
              const query = `UPDATE  [User].[dbo].[User_info] SET email = '${email}' , name = '${name}' , password = '${password}' 
              where id = ${id} `;
              request.query(query, (err, result) => {
                if (err) {
                  console.error("Lỗi thêm người dùng vào cơ sở dữ liệu:", err);
                  return res
                    .status(500)
                    .send("Lỗi thêm người dùng vào cơ sở dữ liệu");
                }
                return res.redirect("/user")
                  
                
              });
            }
          });
        });
      }
      
    });
  }
}

module.exports = new AuthController();
