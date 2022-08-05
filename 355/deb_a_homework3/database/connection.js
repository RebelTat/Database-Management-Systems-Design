const mysql = require('mysql');

const connection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: 3306,
    database: 'adeb_cs355fa21',
    user: 'adeb_cs355fa21',
    password: 'de7391495',
});

module.exports = connection;