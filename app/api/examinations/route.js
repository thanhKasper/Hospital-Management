import { connectToDb } from '@/lib/database'
import { formatDate } from '@/supportFunction'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const outpatienCode = searchParams.get('opCode')
  const connection = await connectToDb()

  // Retrieve information about examination of an outpation
  const [rows, fields] = await connection.execute(
    'SELECT * FROM examination WHERE ExaminationOPID = ?',
    [outpatienCode]
  )
  for (let row of rows) {
    row.Date = formatDate(row.Date)
    row.NextDate = row.NextDate === null ? 'N/A' : formatDate(row.NextDate)
    row.Fee = row.Fee === null ? 'N/A' : row.Fee
  }

  connection.destroy()
  return Response.json({
    query: rows,
  })
}
