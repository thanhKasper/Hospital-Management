import { formatDate } from '@/supportFunction'
import { connectToDb } from '@/lib/database'

export async function GET(request, { params }) {
  const inpatientCode = params.ipcode
  const seq = params.seq

  const connection = await connectToDb()

  // Retrieve information about examination of an outpation
  const [rows, fields] = await connection.execute(
    `SELECT InfoSeq, IPID, AdmissionDate, InfoDiagnosis, Sickroom, DischargeDate, Fee, TCareNurseCode, CONCAT(FName, " ", LName) AS NurseName, SUM(m.Price * tm.TreatMedQuantity) + Fee as TotalVisitMedPrice
    FROM info i
    JOIN Employee ON TCareNurseCode = EmpCode
    LEFT JOIN T_Medication tm ON i.IPID = tm.TreatTreatmentIPID AND i.InfoSeq = tm.TreatTreatmentInfoSeq
    LEFT JOIN Medication m ON tm.TreatMedCode = m.MedCode AND tm.TreatMedProCode = m.MedProCode AND tm.TreatMedPacketCode = m.MedPacketCode
    WHERE IPID = ? AND InfoSeq = ?`,
    [inpatientCode, seq]
  )
  rows[0].AdmissionDate = formatDate(rows[0].AdmissionDate)
  rows[0].DischargeDate =
    rows[0].DischargeDate === null ? 'N/A' : formatDate(rows[0].DischargeDate)
  rows[0].Fee = rows[0].Fee === null ? 'N/A' : rows[0].Fee
  rows[0].TotalVisitMedPrice =
    rows[0].TotalVisitMedPrice === null ? 'N/A' : rows[0].TotalVisitMedPrice
  connection.destroy()

  return Response.json({
    query: rows,
  })
}
