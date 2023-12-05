import { formatDate } from '@/supportFunction'
import { connectToDb } from '@/lib/database'

export async function GET(request, { params }) {
  const inpatientCode = params.ipcode
  const infoseq = params.ipseqnum
  console.log(inpatientCode, infoseq)
  const connection = await connectToDb()

  // Retrieve information about examination of an outpation
  const [rows, fields] = await connection.execute(
    'SELECT * FROM treatment WHERE TreatmentIPID = ? AND TreatmentInfoSeq = ?',
    [inpatientCode, infoseq]
  )
  for (let row of rows) {
    row.StartDate = formatDate(row.StartDate)
    row.EndDate = row.EndDate === null ? 'N/A' : formatDate(row.EndDate)
    row.Fee = row.Fee === null ? 'N/A' : row.Fee
    row.IsRecovered = true ? 'Recovered' : 'Not recovered'
  }

  connection.destroy()

  return Response.json({
    query: rows,
  })
}
