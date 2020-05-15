const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

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

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
