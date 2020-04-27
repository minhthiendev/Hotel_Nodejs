const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection(dbConfig.mysql);
module.exports = connection;

connection.connect(function (err) {
    if (err) {
        console.log('ERROR CONNECT admin:', err.code + '--' + err.address);
    } else {
        console.log('Connected to DB')
    }
});
