import React, { Component } from 'react'
import NextHead from 'next/head'

class Header extends Component {

    render() {
        const structureData = `{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kota Ambon",
                "addressRegion": "Nusaniwe, Benteng",
                "postalCode": "97117",
                "streetAddress": "Jl. Gudang Arang, No. 1"
            },
            "name": "Tantekos",
            "telephone": "6287872033154",
            "url": "https://www.tantekos.com"
        }`

        return (
            <>
                <NextHead>
                    <title>Tantekos - Cari kos lebih mudah</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <script type="application/ld+json">{structureData}</script>
                </NextHead>
            </>
        )
    }
}

export default Header;