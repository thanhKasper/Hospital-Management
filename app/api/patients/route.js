import { connectToDb } from '@/lib/database'

export async function GET() {
  const conn = await connectToDb()

  // const [rows, fields] = await conn.execute(
  //   `SELECT PSSN, CONCAT(Fname, ' ', Lname) as Fullname, BirthDate, Gender FROM patient`
  // )
  const [rows, fields] = await conn.execute(
    `SELECT
      PATIENT.PSSN,
      CONCAT(PATIENT.FName, ' ', PATIENT.LName) as Fullname,
      PATIENT.BirthDate,
      PATIENT.Gender,
      PATIENT.PatPhoneNumber,
      IPATIENT.IPCode,
      OPATIENT.OPCode
      FROM
          PATIENT
      LEFT JOIN
          IPATIENT ON PATIENT.PSSN = IPATIENT.PSSN
      LEFT JOIN
          OPATIENT ON PATIENT.PSSN = OPATIENT.PSSN;
  `
  )
  for (let record of rows) {
    const date = new Date(record.BirthDate)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const newDateFormat = date.toLocaleDateString('en-US', options)
    record.BirthDate = newDateFormat
    record.Gender = record.Gender == 'F' ? 'Female' : 'Male'
  }

  return Response.json({
    query: rows,
  })
}
