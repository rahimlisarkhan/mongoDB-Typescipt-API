import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../helper/const-util'
import { connectDatabase, emailCheckDataBase } from '../../../helper/db-util'


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials: any) {
                const client = await connectDatabase()

                const user = await emailCheckDataBase(client, 'users', { email: credentials.email })

                if (!user) {
                    client.close()
                    throw new Error('User not found')
                }

                const isValid = await verifyPassword(credentials.password, user.password)

                if (!isValid) {
                    client.close()
                    throw new Error('Could not log you in')
                }

                client.close()

                return { email: user.email }
            }
        })
    ]
})