import mysql from 'mysql2/promise'

export const connectToDb = async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'hospital_management',
    })
    return conn
  } catch (err) {
    console.error(err)
  }
}
