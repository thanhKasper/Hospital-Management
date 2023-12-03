const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "hospital_management"
})

conn.query("SELECT * FROM patient", function(err, res, fields) {
    if (err) throw err
    console.log(res)
})