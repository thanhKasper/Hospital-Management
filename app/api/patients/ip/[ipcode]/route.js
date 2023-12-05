import { connectToDb } from '@/lib/database'

export async function GET(request, { params }) {
  const patientCode = params.ipcode
  const connection = await connectToDb()
  // Get patient info
  const [rows, fields] = await connection.execute(
    `SELECT * from ipatient natural join patient WHERE ipcode = ?;`,
    [patientCode]
  )
  const date = new Date(rows[0].BirthDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const newDateFormat = date.toLocaleDateString('en-US', options)
  rows[0].BirthDate = newDateFormat
  rows[0].Gender = rows[0].Gender == 'F' ? 'Female' : 'Male'
  const ssn = rows[0].PSSN
  // Get OP info if exist
  const [outPatientCode, ofields] = await connection.execute(
    `SELECT * from opatient WHERE PSSN = ?;`,
    [ssn]
  )

  connection.destroy()
  return Response.json({
    query: rows,
    opCode: outPatientCode.length > 0 ? outPatientCode[0].OPCode : null,
  })
}
