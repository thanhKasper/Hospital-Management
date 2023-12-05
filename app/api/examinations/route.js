import mysql from 'mysql2/promise'
import { formatDate } from '@/supportFunction'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const outpatienCode = searchParams.get("opCode")
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hospital_management"
    })

    // Retrieve information about examination of an outpation
    const [rows, fields] = await connection.execute("SELECT * FROM examination WHERE ExaminationOPID = ?", [outpatienCode])
    for (let row of rows) {
        row.Date = formatDate(row.Date)
        row.NextDate = row.NextDate === null ? "N/A" : formatDate(row.NextDate)
        row.Fee = row.Fee === null ? "N/A" : row.Fee
    }

    connection.destroy()
    return Response.json({
        query: rows
    })
}