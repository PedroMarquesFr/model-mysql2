const connection = require("./connection");

function User() {
  const createFullName = ({ id, firstName, middleName, lastName }) => {
    const fullName = [firstName, middleName, lastName]
      .filter((name) => name)
      .join(" ");
    return {
      id,
      firstName,
      middleName,
      lastName,
      fullName,
    };
  };
  const serialize = ({ id, first_name, last_name, email, password }) => ({
    id,
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  });
  return {
    create: async function (firstName, lastName, email, password) {
      connection.execute(
        "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
        [firstName, lastName, email, password]
      );
    },
    getAll: async function () {
      const [resp] = await connection.execute("SELECT * FROM users");
      return resp.map(serialize);
    },
    getById: async function (id) {
      const [resp] = await connection.execute("SELECT * FROM users WHERE id = ?",[id]);
      return resp.map(serialize);
    },
    update: async function (id, firstName, lastName, email, password) {
      connection.execute(
        "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?",
        [firstName, lastName, email, password, id]
      );
    },
    delete: async function (id) {
      connection.execute(
        "DELETE FROM users WHERE id = ?",
        [id]
      );
    },
    isValid: function (firstName, lastName, email, password) {
      if (!firstName || typeof firstName !== "string") return false;
      if (!lastName || typeof lastName !== "string") return false;
      if (!email || typeof email !== "string") return false;
      if (!password || typeof password !== "string") return false;
      return true;
    },
  };
}

module.exports = User;
