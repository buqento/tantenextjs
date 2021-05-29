import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Facebook({
            clientId: '3234331779955939',
            clientSecret: '36c5221cdbdfe874b6f13fd59eac1c19'
        })
    ],
    site: 'https://tantekos.com'
}

export default (req, res) => NextAuth(req, res, options)