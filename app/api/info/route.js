import mysql from 'mysql2/promise'
import { formatDate } from '@/supportFunction'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const inpatienCode = searchParams.get("ipCode")

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "hospital_management"
    })

    // Retrieve information about examination of an outpation
    const [rows, fields] = await connection.execute("SELECT * FROM info WHERE IPID = ?", [inpatienCode])
    for (let row of rows) {
        row.AdmissionDate = formatDate(row.AdmissionDate)
        row.DischargeDate = row.DischargeDate === null ? "N/A" : formatDate(row.DischargeDate)
        row.Fee = row.Fee === null ? "N/A" : row.Fee
    }

    connection.destroy()

    return Response.json({
        query: rows
    })
}