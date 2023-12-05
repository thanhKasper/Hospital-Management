import { connectToDb } from '@/lib/database'
import { formatDate } from "@/supportFunction"
import mysql from "mysql2/promise"

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const exId = searchParams.get("exId")
    const opCode = searchParams.get("opCode")

    const conn = await connectToDb()

    const [rows, fields] = await conn.execute(`
        SELECT ExaminationOPID, ExaminationDoctorCode, ExaminationDiagnosis, Date, Fee, NextDate, CONCAT(FName, ' ', LName) as DocName
        FROM examination JOIN employee ON ExaminationDoctorCode = EmpCode 
        WHERE ExaminationOPID = ? AND ExaminationSeq = ?;
        `, 
        [opCode, exId]
    )
    for (let row of rows) {
        row.Date = row.Date === null ? "N/A" : formatDate(row.Date)
        row.NextDate = row.NextDate === null ? "N/A" : formatDate(row.NextDate)
    }

    conn.destroy()

    return Response.json({
        query: rows[0]
    })
}