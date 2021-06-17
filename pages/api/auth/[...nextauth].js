import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const options = {
    providers: [
        Providers.Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        session: async (session, user, _sessionToken) => {
            session.user.id = user.id;
            return Promise.resolve(session);
        },
    }
}
export default (req, res) => NextAuth(req, res, options)