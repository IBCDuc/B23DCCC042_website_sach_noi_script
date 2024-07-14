//config data
const db = require("./config/mssql/book_index.js")
const db_book_query = require("./config/mssql/book_index_query.js")
const db_config = require("./config/config.js")
const sql = require('mssql/msnodesqlv8');
const db_books_detail = require("./config/mssql/book_index_audio.js")

//danh-muc
const db_cong_nghe= require("./config/mssql/cong_nghe.js")
const db_nau_an= require("./config/mssql/nau_an.js")
const db_ngon_tinh= require("./config/mssql/ngon_tinh.js")
const db_tieu_thuyet= require("./config/mssql/tieu_thuyet.js")
const db_triet_ly= require("./config/mssql/triet_ly.js")

//tac-gia
const db_barthes= require("./config/mssql/barthes.js")
const db_fumio= require("./config/mssql/fumio.js")
const db_grenier= require("./config/mssql/grenier.js")
const db_nguyen_nhat_anh = require("./config/mssql/nguyen_nhat_anh.js")
const db_nguyen_thuy_linh = require("./config/mssql/nguyen-thuy-linh.js")
const db_guevara= require("./config/mssql/guevara.js")


class BooksController {
  // GET /books
  async index(req, res) {
    const query = req.query.query
    const result2 = await db.connect()
    //ket noi va them tham so
    const pool = await sql.connect(db_config);
    const request = pool.request()
    


    request.input('query' , sql.NVarChar, `%${query}%`)
    const result = await request.query `SELECT * FROM [Book].[dbo].[Books] WHERE name LIKE @query OR author LIKE @query`;
    console.log(result)
    console.log(result.length)
    if (query) {
      res.render('books', { layout: 'books', books: result.recordset});
    } else {
      res.render('books', { layout: 'books', books: result2});
    }

  }

  async index_limit_books(req, res) {
    const result = await db_book_query.connect()
    res.render('books', { layout: 'books', books_query: result});
  }



  show(req, res) {
    res.send("Hello world");
  }

  async books_by_id(req , res) {
    //lấy url
    const fullPath = req.originalUrl;
    const pathToMatch = fullPath.split('/')[2]

    //kết nối và thêm input tham số
    const pool = await sql.connect(db_config);
    const request = pool.request()
    request.input('pathToMatch' , sql.NVarChar, pathToMatch)

    //truy vấn
    const result = await request.query`SELECT *
    FROM [Book].[dbo].[Books] 
    where link_name = @pathToMatch`;

    //connect db2
    const result2 = await db_books_detail.connect()

    res.render('books_detail', { layout: "books_detail", books_query_ori: result.recordset, books_query: result2 })

  }
  // danh-muc
  async Cong_nghe(req, res) {
    const result = await db_cong_nghe.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async Nau_an(req, res) {
    const result = await db_nau_an.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async Ngon_tinh(req, res) {
    const result = await db_ngon_tinh.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async Tieu_thuyet(req, res) {
    const result = await db_tieu_thuyet.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async Triet_ly(req, res) {
    const result = await db_triet_ly.connect()
    res.render('books', { layout: 'books', books: result});
  }
  //tac-gia
  async barthes(req, res) {
    const result = await db_barthes.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async fumio(req, res) {
    const result = await db_fumio.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async grenier(req, res) {
    const result = await db_grenier.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async guevara(req, res) {
    const result = await db_guevara.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async nguyen_nhat_anh(req, res) {
    const result = await db_nguyen_nhat_anh.connect()
    res.render('books', { layout: 'books', books: result});
  }
  async nguyen_thuy_linh(req, res) {
    const result = await db_nguyen_thuy_linh.connect()
    res.render('books', { layout: 'books', books: result});
  }
}

module.exports = new BooksController();
