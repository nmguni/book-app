// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

const { MONGODB } = require("./config.js");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

// set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
//layout file - everysingle file wil be but inside of this file
app.set("layout", "layouts/layout");
app.use(expressLayouts);
// out public files. style sheets, img, js etc
app.use(express.static("public"));

// // mongoose
mongoose.connect(MONGODB, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () =>
  console.log("MongoDB database connection established successfully")
);

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
