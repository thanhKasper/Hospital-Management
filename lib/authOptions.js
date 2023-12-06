import CredentialsProvider from 'next-auth/providers/credentials'

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
      authorize(credentials, req) {
        const { username, password } = credentials
        if (username !== 'admin' || password !== 'admin') { // check database
          return null
        }
        return { id: 1, name: 'ADMIN' } // return some info of admin
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
  },
}
