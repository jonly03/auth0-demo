require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { auth, requiresAuth } = require("express-openid-connect");
const { config } = require("./auth0-config");

const app = express();

const books = [
  {
    title: "How To Win Friends and Influence People",
    author: "Dale Carnegie",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbc_YhzL6ZBytGgPGwEV57wL9a3se2TDL4bTJq2Iv01N_W4oz02Fn6gIjUYDtD3CT9Q98-g6gh&usqp=CAc",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZmknB1jEzG-9nXZBWA-YYBrRalqyx1KGj3wNqHCmQ6VCeJov4EEsJgs6h2QxwwL8bnC2zarT&usqp=CAc",
  },
];

app.use(express.static("public"));
app.use(cors());

// /login /callback /logout
app.use(auth(config));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/user/me", (req, res) => {
  if (req.oidc.user !== undefined) {
    return res.send({ user: req.oidc.user });
  } else {
    res.send({});
  }
});

app.get("/books", requiresAuth(), (req, res) => {
  res.send({
    books,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});
