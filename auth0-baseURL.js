const baseURL = process.env.PORT
  ? "https://auth0books.herokuapp.com"
  : "http://localhost:3000";

module.exports = {
  baseURL,
};
