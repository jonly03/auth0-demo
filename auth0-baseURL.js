const baseURL = process.env.PORT
  ? "https://booklet.heroku.app"
  : "http://localhost:3000";

module.exports = {
  baseURL,
};
