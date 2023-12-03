const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "hospital_management"
})

conn.query(`SELECT * from ipatient WHERE PSSN = ?;`, ["456789012345"], function(err, res, fields) {
    if (err) throw err
    console.log(res)
})