import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const options = {
    providers: [
        Providers.Google({
            clientId: '788082975831-ntcfkidf9min361onfgppq616af2gagt.apps.googleusercontent.com',
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