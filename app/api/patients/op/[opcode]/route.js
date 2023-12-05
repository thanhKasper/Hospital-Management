import { connectToDb } from '@/lib/database'

export async function GET(request, { params }) {
  const patientCode = params.opcode
  const connection = await connectToDb()
  // Get patient info
  const [rows, fields] = await connection.execute(
    `SELECT * from opatient natural join patient WHERE opcode = ?;`,
    [patientCode]
  )
  const date = new Date(rows[0].BirthDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const newDateFormat = date.toLocaleDateString('en-US', options)
  rows[0].BirthDate = newDateFormat
  rows[0].Gender = rows[0].Gender == 'F' ? 'Female' : 'Male'
  const ssn = rows[0].PSSN
  // Get IP info if exist
  const [inPatientCode, ofields] = await connection.execute(
    `SELECT * from ipatient WHERE PSSN = ?;`,
    [ssn]
  )

  connection.destroy()
  return Response.json({
    query: rows,
    ipCode: inPatientCode.length > 0 ? inPatientCode[0].IPCode : null,
  })
}
