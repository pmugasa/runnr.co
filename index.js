const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(path.join(__dirname, "src")));

//signup route
app.post("/signup", (req, res) => {
  const email = req.body;

  // form validation to make sure fields are not empty
  if (!email) {
    res.redirect("/failed.html");
    return;
  }

  //construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            EMAIL: email
        }
      },
    ],
  };
  const postData = JSON.stringify(data);

  const options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/eb4f985aa8",
    method: "POST",
    headers: {
      Authorization: "auth fec9ad340deba187ddd7a58f129003ff-us17",
    },
    body: postData,
  };

  request(options, (err, response, body) => {
    if (err) {
      res.redirect("failed.html");
    } else {
      if (response.statusCode === 200) {
        res.redirect("/success.html");
      } else {
        res.redirect("failed.html");
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
