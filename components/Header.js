import React, { Component } from 'react'
import NextHead from 'next/head'

class Header extends Component {

    render() {
        const structureTypeWebsite = {
            '@type': 'WebSite',
            url: 'https://tantekos.com',
            name: 'Tantekos',
            alternateName: 'Kos Online, Informasi Kos, Informasi Kontrakan | Tantekos.com',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://tantekos.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
            }
        };

        const structureTypeOrganization = {
            '@type': 'Organization',
            name: 'Tantekos',
            alternateName: 'Kos Online, Informasi Kos, Informasi Kontrakan | Tantekos.com',
            url: 'https://www.tantekos.com',
            logo: {
                "@type": "ImageObject",
                "url": "https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true"
            },
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+6285243322433',
                contactType: 'customer service',
                areaServed: 'ID',
                availableLanguage: 'Indonesian'
            },
            sameAs: ['https://www.facebook.com/tantekos/', 'https://tantekos.com/', 'https://twitter.com/tantekos', 'https://www.instagram.com/tantekos_official/', 'https://www.youtube.com/tantekos.com'
            ]
        };

        const structureTypeLocalBusiness = {
            '@type': "LocalBusiness",
            address: {
                '@type': "PostalAddress",
                addressLocality: "Kota Ambon",
                addressRegion: "Nusaniwe, Benteng",
                postalCode: "97117",
                streetAddress: "Jl. Gudang Arang, No. 1"
            },
            name: "Tantekos",
            telephone: "6287872033154",
            url: "https://www.tantekos.com",
            image:"https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true",
            priceRange: 'Rp 50.000 - Rp 15.000.000',
        }

        const structureHomePage = {
            '@context': 'https://schema.org',
            '@graph': [
                structureTypeWebsite,
                structureTypeOrganization,
                structureTypeLocalBusiness
            ]
        };

        return (
            <>
                <NextHead>
                    <title>Tantekos - Cari Kos Lebih Mudah</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="keywords" content="tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <script type="application/ld+json">{JSON.stringify(structureHomePage)}</script>
                </NextHead>
            </>
        )
    }
}

export default Header;