const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hospital_management"
})

conn.execute(
    `
    SELECT *
    FROM patient;
    `,
    function (err, rows, fields) {
        if (err) throw err 
        else {
            console.log(rows)
        }
    }
)


conn.destroy()