require("dotenv").config();

const express = require("express");
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

// /login /callback /logout
app.use(auth(config));

app.get("/", (req, res) => {
  res.redirect("https://www.nellysugu.com/auth0-demo-front-end/");
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
