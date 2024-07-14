const db = require("./config/mssql/book_index.js")
const db_book_query = require("./config/mssql/book_index_query.js")
const db_config = require("./config/config.js")
const sql = require('mssql/msnodesqlv8');
const db_user = require("./config/mssql/user_all.js")
class SiteController {
  async home(req, res) {
    const result = await db_book_query.connect()
    res.render("home" , { books_query: result});
  }

  async signup(req, res) {
    res.render("signup" , {layout : 'signup'});
  }

  etc(req , res) {
    res.send("noting in this page")
  }

  login(req , res) {
    res.render("login" , {layout : 'login'})
  }

  async lms(req , res) {
    const pool = await sql.connect(db_config);
    const request = pool.request()
    const result = await request.query`SELECT COUNT(*) as totalbooks
    FROM [Book].[dbo].[Books]`
    const totalbooks = result.recordset[0].totalbooks;
    const result2 = await request.query`SELECT COUNT(*) as  totalusers
    FROM [USER].[dbo].[User_info]`
    const totalusers = result2.recordset[0].totalusers;
    const result3 = await request.query`SELECT COUNT(*) as totaladmins
    FROM [USER].[dbo].[Admin_user]` 
    const totaladmins = result3.recordset[0].totaladmins;
    const result4 = await request.query`SELECT COUNT(DISTINCT(author)) AS totalauthors
    FROM [BOOK].[dbo].[Books]`
    const totalauthors = result4.recordset[0].totalauthors;
    const result5 = await request.query`SELECT COUNT(DISTINCT(phan_loai)) AS totalphanloai
    FROM [BOOK].[dbo].[Books]` 
    const totalphanloai = result5.recordset[0].totalphanloai;
    res.render("lms" , {layout : 'lms' , title: 'HỆ THỐNG QUẢN LÝ SÁCH' , alluser: `Tổng số người dùng đã đăng ký: ${totalusers}`, alladmin: `Tổng số người quản trị: ${totaladmins}`, allbook: `Tổng số sách: ${totalbooks}`, allcate: `Tổng số thể loại: ${totalphanloai}`, allauthor: `Tổng số tác giả: ${totalauthors}`})
  }
  addbook(req , res) {
    res.render("addbook" , {layout : 'lms'})
  }
  me(req , res) {
    res.render("aboutme" , {layout : 'aboutme'})
  }
  async user(req , res) {
    const result = await db_user.connect()
    res.render("user" , {layout : 'lms' , user: result})
  }




}

module.exports = new SiteController();
