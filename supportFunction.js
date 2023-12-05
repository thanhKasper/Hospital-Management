import mysql from "mysql2/promise"

export function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDateFormat = date.toLocaleDateString('en-US', options);
    return newDateFormat;
}

export async function connectToDBAndQuery(query, params) {
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hospital_management"
    })

    const [rows, fields] = await conn.execute(query, params)
    conn.destroy()
    return rows 
}
