import React, { Component } from 'react'
import NextHead from 'next/head'
import { shape } from 'prop-types'
class Header extends Component {
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
            alternateName: 'tantekos.com',
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
                    name: "King Richard"
                }
            },
            "geo": {
                '@type': "GeoCoordinates",
                latitude: -3.703152,
                longitude: 128.162934
            },
            name: "tantekos.com",
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
        const { seo } = this.props
        return (
            <>
                <NextHead>
                    <title>{seo.title}</title>
                    <meta name="description" content={seo.description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="classification" content="Sewa Kost, Property, Rent House, Rent Room, seo Kost, seormation, Kost, Room, Cari Kost, Kost Murah, Kost Eksklusif, Kost Bebas, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, Kost Mingguan, Kost Bulanan, Kost Tahunan" />
                    <meta name="keywords" content="Infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost murah" />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${images[rand]}.webp`} />
                    <meta property="og:image:alt" content={seo.title} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content="3234331779955939" />
                    <meta name="keyphrases" content="Infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost murah" />
                    <meta property="og:type" content="website" />
                    {
                        seo &&
                        <>
                            <meta property="og:title" content={seo.title} />
                            <meta property="og:description" content={seo.description} />
                            <meta property="og:url" content={`https://tantekos.com/${seo.url}`} />
                            <link rel="canonical" content={`https://tantekos.com/${seo.url}`} />
                        </>
                    }
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureHomePage) }} />
                </NextHead>
            </>
        )
    }
}
Header.propTypes = {
    seo: shape()
}
Header.defaultProps = {
    seo: null
}
export default Header;