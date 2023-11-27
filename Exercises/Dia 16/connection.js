const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'studentdb'
});

connection.connect(function (error) {
    if (error) throw error;
    console.log('DB connected.');
});

module.exports = { connection };