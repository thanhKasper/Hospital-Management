import { connectToDBAndQuery } from '@/supportFunction'
import CredentialsProvider from 'next-auth/providers/credentials'
import sha256 from 'sha256'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { username, password } = credentials
        const rows = await connectToDBAndQuery(`
        SELECT username, password 
        FROM account
        WHERE username = ?
        `, [username])
        const acc = rows.length > 0 ? rows[0] : null 
        if (acc) {
          if (sha256(password) == acc.password) return { id: 1, name: 'ADMIN' } // return some info of admin
          return null 
        } 
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
  },
}
