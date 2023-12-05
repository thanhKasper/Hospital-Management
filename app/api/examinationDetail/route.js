import { formatDate } from "@/supportFunction"
import mysql from "mysql2/promise"

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const exId = searchParams.get("exId")
    const ssn = searchParams.get("ssn")

    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hospital_management"
    })

    const [rows, fields] = await conn.execute(`SELECT * FROM (examination JOIN opatient ON ExaminationOPID = OPCode) JOIN employee ON ExaminationDoctorCode = EmpCode WHERE PSSN = ? AND ExaminationSeq = ?;`, [ssn, exId])
    for (let row of rows) {
        row.Date = row.Date === null ? "N/A" : formatDate(row.Date)
        row.NextDate = row.NextDate === null ? "N/A" : formatDate(row.NextDate)
    }

    conn.destroy()

    return Response.json({
        query: rows[0]
    })
}