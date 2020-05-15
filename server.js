const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Db config
const db = require("./config/keys").mongoURI;

//Connect to mongo db
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => res.send("Hellooo!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runing on port ${port}`));
