import {connectToDBAndQuery} from "@/supportFunction"

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams 
    const opCode = searchParams.get("opCode")
    const empCode = searchParams.get("empCode")
    const exId = searchParams.get("exId")

    const res = await connectToDBAndQuery(
        `select MedCode, MedName, Price
        from e_medication join medication on ExamMedCode = MedCode AND ExamMedProCode = MedProCode AND ExamMedPacketCode = MedPacketCode
        where ExamExaminationSeq = ? AND ExamExaminationDoctorCode = ? AND ExamExaminationOPID = ?;`,
        [exId, empCode, opCode]

    )


    return Response.json({
        query: res
    })
}