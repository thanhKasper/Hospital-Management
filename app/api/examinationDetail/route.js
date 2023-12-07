import { connectToDb } from '@/lib/database'
import { formatDate } from '@/supportFunction'
import mysql from 'mysql2/promise'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const exId = searchParams.get('exId')
  const opCode = searchParams.get('opCode')

  const conn = await connectToDb()

  const [rows, fields] = await conn.execute(
    `
        SELECT ExaminationOPID, ExaminationDoctorCode, ExaminationDiagnosis, Date, Fee, NextDate, CONCAT(FName, ' ', LName) as DocName
        FROM examination JOIN employee ON ExaminationDoctorCode = EmpCode 
        WHERE ExaminationOPID = ? AND ExaminationSeq = ?;
        `,
    [opCode, exId]
  )
  for (let row of rows) {
    row.Date = row.Date === null ? 'N/A' : formatDate(row.Date)
    row.NextDate = row.NextDate === null ? 'N/A' : formatDate(row.NextDate)
  }

  conn.destroy()

  return Response.json({
    query: rows[0],
  })
}
export async function POST(req) {
  const { SSN, OPCode, doctorCode, diagnosis, fee, date, nextDate } =
    await req.json()
  console.log(OPCode, doctorCode, diagnosis, fee, date, nextDate)
  let op, seq
  const conn = await connectToDb()
  if (!OPCode) {
    const [rows, fields] = await conn.execute(
      `SELECT MAX(CAST(SUBSTRING(OPCode, 3) AS UNSIGNED)) AS latest_op FROM OPATIENT;`
    )
    if (rows[0]?.latest_op) {
      op = (rows[0].latest_op + 1).toString()
      if (op.length < 9) {
        const zerosToAdd = 9 - str.length
        op = '0'.repeat(zerosToAdd) + str
      }
      op = 'OP' + op
    } else {
      op = 'OP000000001'
    }
  } else {
    op = OPCode
  }
  const [rows, fields] = await conn.execute(
    `SELECT MAX(ExaminationSeq) AS latest_seq
    FROM examination
    WHERE ExaminationOPID = ? AND ExaminationDoctorCode = ?;`,
    [op, doctorCode]
  )

  if (rows[0]?.latest_seq) {
    seq = rows[0].latest_seq + 1
  } else {
    seq = 1
  }
  try {
    if (!OPCode) {
      await conn.execute(`INSERT INTO OPatient(OPCode, PSSN) VALUES(?, ?);`, [
        op,
        SSN,
      ])
    }
    await conn.execute(
      `INSERT INTO EXAMINATION(ExaminationDoctorCode, ExaminationOPID, ExaminationSeq, ExaminationDiagnosis, Date, Fee, NextDate) VALUES(?, ?, ?, ?, ?, ?, ?);`,
      [doctorCode, op, seq, diagnosis, date, fee, nextDate]
    )
    return Response.json(
      { message: 'Created', op: op, seq: seq },
      { status: 201 }
    )
  } catch (err) {
    return Response.json({ error: `${err.sqlMessage}` }, { status: 500 })
  }
}
