const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const mssql = require('./app/controllers/config/mssql/index.js')

// http logger
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'public')))

// phân tích dữ liệu của các biểu mẫu HTML được gửi bằng phương thức POST
app.use(express.urlencoded({ extended: false}))

//phân tích các yêu cầu có payload JSON.
app.use(express.json())




// template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'))

// routes init
const routes = require('./routes')

routes(app)

//connect mssql
//mssql.connect()

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


