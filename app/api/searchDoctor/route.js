import { connectToDBAndQuery } from "@/supportFunction";

export async function GET(request) {
    const queryStr = request.nextUrl.searchParams.get("query")
    const rows = await connectToDBAndQuery(
        `
        select patient.PSSN, CONCAT(patient.FName, ' ', patient.LName) as Fullname, patient.PatPhoneNumber, patient.Gender
        from (treatment JOIN employee ON TreatmentDoctorCode = EmpCode) JOIN (patient natural join ipatient) ON TreatmentIPID = IPCode
        where CONCAT(employee.FName, ' ', employee.LName) LIKE '%${queryStr}%'
        group by IPCode
        `
    )
    for (let row of rows) {
        row.Gender = row.Gender == 'F' ? "Female" : "Male"
    }
    return Response.json({
        searchBy: "Doctor",
        searchFor: queryStr,
        query: rows
    })
}