import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
    providers: [
        Providers.Facebook({
            clientId: process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_SECRET
        })
    ]
})