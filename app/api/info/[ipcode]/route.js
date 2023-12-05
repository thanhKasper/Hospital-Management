import { formatDate } from '@/supportFunction'
import { connectToDb } from '@/lib/database'

export async function GET(request, { params }) {
  const inpatientCode = params.ipcode

  const connection = await connectToDb()

  // Retrieve information about examination of an outpation
  const [rows, fields] = await connection.execute(
    'SELECT * FROM info WHERE IPID = ?',
    [inpatientCode]
  )
  for (let row of rows) {
    row.AdmissionDate = formatDate(row.AdmissionDate)
    row.DischargeDate =
      row.DischargeDate === null ? 'N/A' : formatDate(row.DischargeDate)
    row.Fee = row.Fee === null ? 'N/A' : row.Fee
  }

  connection.destroy()

  return Response.json({
    query: rows,
  })
}
