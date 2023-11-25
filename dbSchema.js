const mysql = require('mysql2')

const pool = mysql.createPool({
    host:  'localhost',
    user: 'root',
    password: 'admin', 
    database: 'hospitaldb'
}).promise()

// const res = pool.query(`CREATE TABLE PATIENT (
//     name varchar(20),
//     age int,
//     ssn varchar(20)
// );`

