const db = require("../connection");

async function createTableUsers() {
  return await db.schema
    .createTable("users", (table) => {
      table.increments("id").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.unique("email");
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

createTableUsers().then((data) => {
  process.exit();
});
