import { connectToDBAndQuery, formatDate } from "@/supportFunction";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const searchInfo = searchParams.get("query")
    const result = await connectToDBAndQuery(`
    SELECT PSSN, CONCAT(FName, ' ', LName) as Fullname, PatPhoneNumber, Gender
    FROM patient
    WHERE PSSN = '${searchInfo}'
    UNION
    SELECT PSSN, CONCAT(FName, ' ', LName) as Fullname, PatPhoneNumber, Gender
    FROM patient
    WHERE CONCAT(FName, ' ', LName) LIKE '%${searchInfo}%'
    UNION
    SELECT PSSN, CONCAT(FName, ' ', LName) as Fullname, PatPhoneNumber, Gender
    FROM patient
    WHERE PatPhoneNumber = '${searchInfo}'
    `)
    for (let row of result) {
        row.BirthDate = formatDate(row.BirthDate)
        row.Gender = row.Gender == "F" ? "Female" : "Male"
    }
    return Response.json({
        searchBy: "Patient",
        searchFor: searchInfo,
        query: result
    })
}