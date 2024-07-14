const bookRouter = require("./books");
const siteRouter = require("./site");
const authRouter = require("./auth")
const userRouter = require("./user")
function route(app) {
  app.use("/books", bookRouter);

  app.use("/user" , userRouter )

  app.use("/auth" , authRouter);

  app.use("/", siteRouter);
}

module.exports = route;
