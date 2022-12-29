require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// making the app use css
app.use(express.static(__dirname));

//getting the app to use body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

//user model
const User = mongoose.model("User", userSchema);

//connecting to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log("connected to DB"); // logs when successfully connected to the DB
  })
  .catch((error) => console.log(error)); //catching error

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    await user.save();
    mongoose.connection.close(); // closing the connection to the db
  } catch (error) {
    console.log(error);
    res.sendFile(__dirname + "/public/failed.html");
  }

  res.sendFile(__dirname + "/public/success.html"); // when the user is successfully saved
});

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server started on ${PORT}`));
