const db = require("./connection");

exports.createUser = async (data) => {
  return await db("users")
    .insert(data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

exports.readUser = async () => {
  return await db("users")
    .select("*")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
