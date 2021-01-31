import React, { Component } from 'react'
import NextHead from 'next/head'
import ReactGa from 'react-ga'
class Header extends Component {
    componentDidMount() {
        ReactGa.initialize('UA-132808614-2')
        ReactGa.pageview('/')
    }
    componentDidUpdate() {
        ReactGa.initialize('UA-132808614-2')
        ReactGa.pageview('/')
    }
    render() {
        const structureTypeWebsite = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://tantekos.com/',
            name: 'Tantekos',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://tantekos.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
            }
        };
        const structureTypeOrganization = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Tantekos',
            alternateName: 'Kos Online, Informasi Kos, Informasi Kontrakan | Tantekos.com',
            url: 'https://www.tantekos.com/',
            logo: 'https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true',
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+6285243322433',
                contactType: 'customer service',
                areaServed: 'ID',
                availableLanguage: 'Indonesian'
            },
            sameAs: ['https://www.facebook.com/tantekos/', 'https://tantekos.com/', 'https://twitter.com/tantekos', 'https://www.instagram.com/tantekos_official/'
            ]
        };
        const structureTypeLocalBusiness = {
            '@context': 'https://schema.org',
            '@type': "LocalBusiness",
            address: {
                '@type': "PostalAddress",
                streetAddress: "Jl. Gudang Arang, Benteng, Nusaniwe",
                addressLocality: "Ambon",
                addressRegion: "Maluku",
                postalCode: "97117",
                addressCountry: "ID"
            },
            review: {
                '@type': "Review",
                reviewRating: {
                    '@type': "Rating",
                    ratingValue: 4,
                    bestRating: 5
                },
                author: {
                    '@type': "Person",
                    name: "Bvqento Richard"
                }
            },
            "geo": {
                '@type': "GeoCoordinates",
                latitude: -3.703152,
                longitude: 128.162934
            },
            name: "Tantekos.com",
            telephone: "+6285243322433",
            url: "https://www.tantekos.com/",
            image: "https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true",
            priceRange: 'Rp 50.000 - Rp 15.000.000',
        }
        const structureHomePage = {
            '@graph': [
                structureTypeWebsite,
                structureTypeOrganization,
                structureTypeLocalBusiness
            ]
        };
        const images = ['tt9t2IU', 'NaAULjD', 'RSbvRHn', 'DnxVdqt', 'kOuWQYi', 'TjA9SEq', 'stmSYZ2', 'yXRAu9W', 'rtX3zp9', 'i2aQSZ9'
        ]
        const rand = Math.floor(Math.random() * 10)
        const title = 'Cari Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis'
        return (
            <>
                <NextHead>
                    <title>{title}</title>
                    <meta name="description" content="Tersedia Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis Di Sekitar Anda" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="keywords" content="Tantekos, Info Kost, Cari Kost, Kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/${images[rand]}.webp`} />
                    <meta property="og:image:alt" content={title} />
                    <meta property="og:image:width" content="300" />
                    <meta property="og:image:height" content="300" />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content="3234331779955939" />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureHomePage) }} />
                </NextHead>
            </>
        )
    }
}
export default Header;