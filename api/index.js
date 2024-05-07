require("dotenv").config();
var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var usersRouter = require("./routes/users");
var genresRouter = require("./routes/genres");
var indexInscriptionPasswordRouter = require("./routes/indexInscriptionPassword");
var InscriptionPasswordRouter = require("./routes/inscriptionPassword");
var listeInstrumentsRoutes = require("./routes/listeinstruments");
var théorieMusicalRouter = require("./routes/theorieMusical");
var maoRouter = require("./routes/mao");

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json"); // Chemin vers votre fichier swagger.json

var app = express();
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({ origin: "vercel-front-mekunes-projects.vercel.app" }));

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("LA CAVALERIE EST LA ");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/genres", genresRouter);
app.use("/indexInscriptionPassword", indexInscriptionPasswordRouter);
app.use("/InscriptionPassword", InscriptionPasswordRouter);
app.use("/listeInstruments", listeInstrumentsRoutes);
app.use("/theorieMusical", théorieMusicalRouter);
app.use("/mao", maoRouter);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
