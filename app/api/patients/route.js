import { connectToDb } from '@/lib/database'

export async function GET() {
  const conn = await connectToDb()

  const [rows, fields] = await conn.execute(`SELECT PSSN, CONCAT(Fname, ' ', Lname) as Fullname, PatPhoneNumber, Gender FROM patient`)
  for (let record of rows) {
    record.Gender = record.Gender == "F" ? "Female" : "Male"
  }

  return Response.json({
    query: rows,
  })
}
