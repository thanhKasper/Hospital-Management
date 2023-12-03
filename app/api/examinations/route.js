import mysql from 'mysql2/promise'
import { formatDate } from '@/supportFunction'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const outpatienCode = searchParams.get("opCode")
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "hospital_management"
    })

    // Retrieve information about examination of an outpation
    const [rows, fields] = await connection.execute("SELECT * FROM examination WHERE ExaminationOPID = ?", [outpatienCode])
    rows[0].Date = formatDate(rows[0].Date)

    connection.destroy()
    return Response.json({
        query: rows
    })
}