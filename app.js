const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");

// express app
const app = express();

app.use(bodyParser.json());
fs.writeFileSync("APIlog.txt", `LOG =========================================`);
// connect to database
mongoose.connect("mongodb://localhost/movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// database
const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongodb Connected");
});

// log date and ip of request
function logToFile(req, res, next) {
  fs.appendFileSync(
    "APIlog.txt",
    `\n${req.method} request at ${new Date()} from ${req.ip}`,
    (err) => {
      return;
    }
  );
}

// routes

// get route
app.get("/", (req, res) => {
  logToFile(req);
  res.send("Welcome to my API!");
});

const movieRoute = require("./routes/Movies");
const { route } = require("express/lib/application");
app.use("/movies", movieRoute);

// listening on port 8080
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
