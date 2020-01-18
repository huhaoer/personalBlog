let mysql = require('mysql');

function createConnection() {
    let connection = mysql.createConnection({
        host: '192.168.0.107',
        port: '3306',
        user: 'root',
        password: '184592',
        database: 'my_blog'
    })
    return connection
}
module.exports.createConnection = createConnection