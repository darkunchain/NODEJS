// Este es mi servidor
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");


const app = express();

// connection to db
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/MDA")
  .then(db => console.log("Conectado a la base de datos MongoDB"))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require("./routes/indexRoutes");
const jsonRoutes = require("./routes/jsonRoutes");

// settings
app.set("port", process.env.PORT || 8090);
app.set("views", path.join(__dirname, "views"));
app.engine('hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: {
    inc(value) {
      return Number.parseInt(value, 10) + 1;
    }
  }
}));
app.set('view engine', '.hbs');
app.use(fileUpload());


// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// routes

app.use("/", indexRoutes);
app.use(require("./routes/mongoRoutes"));
app.use(require("./routes/graficosRoutes"));
app.use("/json", jsonRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
