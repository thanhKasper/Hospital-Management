import mysql from "mysql2/promise"

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const patientCode = searchParams.get("id")
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "hospital_management"
    })
    // Get patient info
    const [rows, fields] = await connection.execute(`SELECT * from patient WHERE PSSN = ?;`, [patientCode])
    const date = new Date(rows[0].BirthDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDateFormat = date.toLocaleDateString('en-US', options);
    rows[0].BirthDate = newDateFormat
    rows[0].Gender = rows[0].Gender == "F" ? "Female" : "Male"

    // Get OP info if exist
    const [outPatientCode, ofields] = await connection.execute(`SELECT * from opatient WHERE PSSN = ?;`, [patientCode])

    // Get IP info if exist
    const [inPatientCode, ifields] = await connection.execute(`SELECT * from ipatient WHERE PSSN = ?;`, [patientCode])
    connection.destroy()
    return Response.json({
        query: rows,
        ipCode: inPatientCode.length > 0 ? inPatientCode[0].IPCode : null,
        opCode: outPatientCode.length > 0 ? outPatientCode[0].OPCode : null
    })
}