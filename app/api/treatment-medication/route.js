import { connectToDb } from '@/lib/database'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const ipCode = searchParams.get('ipCode')
  const doctorCode = searchParams.get('doctorCode')
  const treatmentseqnum = searchParams.get('treatmentseqnum')
  const ipseqnum = searchParams.get('ipseqnum')

  const conn = await connectToDb()
  const [rows, fields] = await conn.execute(
    'SELECT TreatMedCode, MedName, Price, TreatMedQuantity FROM T_Medication JOIN Medication ON TreatMedCode = MedCode AND TreatMedProCode = MedProCode AND TreatMedPacketCode = MedPacketCode WHERE TreatTreatmentIPID = ? AND TreatTreatmentInfoSeq = ? AND TreatTreatmentSeq = ? AND TreatTreatmentDoctorCode = ?',
    [ipCode, ipseqnum, treatmentseqnum, doctorCode]
  )
  conn.destroy()

  return Response.json({
    query: rows,
  })
}
