import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const options = {
    providers: [
        Providers.Facebook({
            clientId: process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
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