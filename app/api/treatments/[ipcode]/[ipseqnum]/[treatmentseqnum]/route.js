import { formatDate } from '@/supportFunction'
import { connectToDb } from '@/lib/database'

export async function GET(request, { params }) {
  const inpatientCode = params.ipcode
  const ipseqnum = params.ipseqnum
  const treatmentseqnum = params.treatmentseqnum
  const searchParams = request.nextUrl.searchParams
  const doctorCode = searchParams.get('doctorCode')

  const connection = await connectToDb()

  // Retrieve information about examination of an outpation
  const [rows, fields] = await connection.execute(
    'SELECT TreatmentDoctorCode, TreatmentIPID, TreatmentSeq, IsRecovered, t.StartDate, t.EndDate, Result, CONCAT(FName, " ", LName) AS DoctorName FROM treatment t JOIN Employee e ON TreatmentDoctorCode = EmpCode WHERE TreatmentIPID = ? AND TreatmentInfoSeq = ? AND TreatmentSeq = ? AND TreatmentDoctorCode = ?',
    [inpatientCode, ipseqnum, treatmentseqnum, doctorCode]
  )
  rows[0].StartDate = formatDate(rows[0].StartDate)
  rows[0].EndDate =
    rows[0].EndDate === null ? 'N/A' : formatDate(rows[0].EndDate)
  rows[0].Result = rows[0].Fee === null ? 'N/A' : rows[0].Result
  rows[0].IsRecovered = true ? 'Recovered' : 'Not recovered'

  connection.destroy()

  return Response.json({
    query: rows,
  })
}
