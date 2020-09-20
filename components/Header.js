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
                    <meta name="application-name" content="Tantekos" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="keywords" content="tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <script type="application/ld+json">{structureData}</script>
                </NextHead>
            </>
        )
    }
}

export default Header;