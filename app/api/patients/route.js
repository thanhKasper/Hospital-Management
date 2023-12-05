import { connectToDb } from '@/lib/database'

export async function GET() {
  const conn = await connectToDb()

  const [rows, fields] = await conn.execute(
    `SELECT PSSN, CONCAT(Fname, ' ', Lname) as Fullname, PatPhoneNumber, Gender FROM patient`
  )
  for (let record of rows) {
    record.Gender = record.Gender == 'F' ? 'Female' : 'Male'
  }

  return Response.json({
    query: rows,
  })
}

export async function POST(req) {
  const { fname, lname, SSN, phone, dob, address, gender } = await req.json()
  const conn = await connectToDb()
  try {
    await conn.execute(
      `INSERT INTO Patient(PSSN, FName, LName, BirthDate, Gender, Address, PatPhoneNumber) VALUES(?, ?, ?, ?, ?, ?, ?);`,
      [SSN, fname, lname, dob, gender, address, phone]
    )
    return Response.json({ message: 'Created' }, { status: 201 })
  } catch (err) {
    return Response.json({ error: `${err.sqlMessage}` }, { status: 500 })
  }
}
