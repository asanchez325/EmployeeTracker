const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "KnoxFox#25",
    database: "tracker_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
  });

  module.exports = connection;

