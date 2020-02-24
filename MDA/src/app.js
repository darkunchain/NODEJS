// Este es mi servidor
const path = require("path");
const express = require("express");
var exphbs  = require('express-handlebars');
const morgan = require("morgan");
const mongoose = require("mongoose");
const xlsxtojson = require("xlsx-to-json");
const xlstojson = require("xls-to-json");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
var Handlebars = require('handlebars');


const app = express();

// connection to db
mongoose
  .connect("mongodb://localhost/MDA", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => console.log("Conectado a la base de datos MongoDB"))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require("./routes/indexRoutes");
const jsonRoutes = require("./routes/jsonRoutes");

// settings
app.set("port", process.env.PORT || 8090);
app.set("views", path.join(__dirname, "views"));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(fileUpload());
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});


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
