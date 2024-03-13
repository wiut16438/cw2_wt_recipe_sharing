require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const methodOverride = require("method-override");

const recipesRouter = require("./routes/recipes");
const homeRouter = require("./routes/home");

const app = express();

global.recipes_db = path.join(__dirname, "./data/recipes_db.json");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/recipes", recipesRouter);

app.use("/", homeRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
