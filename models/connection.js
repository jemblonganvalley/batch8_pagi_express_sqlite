const path = require("path");

const db = require("knex")({
  client: "sqlite",
  connection: {
    filename: path.resolve(__dirname, "../db.sqlite"),
  },
});

module.exports = db;
