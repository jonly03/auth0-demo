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
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
  },
];

app.use(cors());

// /login /callback /logout
app.use(auth(config));

app.get("/", (req, res) => {
  res.redirect("https://www.nellysugu.com/auth0-demo-front-end/");
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
    user: req.oidc.user,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});
