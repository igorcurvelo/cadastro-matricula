const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : 'root',
    password : 'Root@123',
    database : 'cadastro-matricula'
});

console.log('pool => create');

pool.on('release', () => console.log('pool => connection return'));

process.on('SIGINT', () => 
    pool.end(err => {
        if(err) return console.log(err);
        console.log('pool => finish');
        process.exit(0);
    })
);

module.exports = pool;