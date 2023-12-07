import { connectToDb } from '@/lib/database'

export async function GET(request) {
  const conn = await connectToDb()

  // Retrieve information about examination of an outpation
  const [rows, fields] = await conn.execute(
    `SELECT EmpCode, Concat(FName, ' ', LName) AS Fullname FROM Employee WHERE EmpType = 'D'`
  )
  console.log(rows)
  conn.destroy()
  return Response.json({
    query: rows,
  })
}
