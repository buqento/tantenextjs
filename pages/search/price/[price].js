import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import { Kost } from '../../../utils/modals/Kost'
import HeadPage from '../../../components/HeadPage'
import ListKos from '../../../components/ListKos'
import Currency from '../../../components/Currency'
import { Price } from '../../../utils/modals/Price'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.price }
    }
    render() {
        const { slug } = this.props;
        const price = Price.filter(item => item.max_price === parseInt(slug))
        const data = Kost.filter(item => (item.start_price >= price[0].min_price && item.start_price <= slug))

        const structureTypeBreadcrumbList =
            `{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@id": "https://tantekos.com/",
                            "name": "Tantekos"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@id": "https://tantekos.com/search/price",
                            "name": "Price"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "item": {
                            "@id": "https://tantekos.com/search/price/${slug}",
                            "name": "Harga Maksimal ${slug}"
                        }
                    }
                ]
            }`

        const structureAreaPage = {
            '@graph': [
                JSON.parse(structureTypeBreadcrumbList)
            ]
        };

        return (
            <>
                <NextHead>
                    <title>Kost Dan Kontrakan Murah Harga Mulai {Currency(price[0].min_price)} - {Currency(price[0].max_price)}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={`Kost Dan Kontrakan Murah Harga Mulai ${Currency(price[0].min_price)} - ${Currency(price[0].max_price)}`} />
                    <meta name="description" content={`Tersedia Kost Dan Kontrakan Murah Harga Mulai ${Currency(price[0].min_price)} - ${Currency(price[0].max_price)}. Informasi Lengkap Dapat Menghubungi Pengelola.`} />
                    <meta name="keywords" content="tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta property="og:title" content={`Kost Dan Kontrakan Murah Harga Mulai ${Currency(price[0].min_price)} - ${Currency(price[0].max_price)}`} />
                    <meta property="og:description" content={`Tersedia Kost Dan Kontrakan Murah Harga Mulai ${Currency(price[0].min_price)} - ${Currency(price[0].max_price)}. Informasi Lengkap Dapat Menghubungi Pengelola.`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://tantekos.com/search/price/${slug}`} />
                    <meta property="og:image" content="https://cdn.statically.io/img/i.imgur.com/w=300/i2aQSZ9.webpm" />
                    <meta property="og:image:alt" content={`Kost Dan Kontrakan Murah Harga Mulai ${Currency(price[0].min_price)} - ${Currency(price[0].max_price)}`} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/search/price/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <div className="main-layout">
                    <HeadPage title={`${Currency(price[0].min_price)} - ${Currency(parseInt(slug))}`} />
                    <ListKos data={data} />
                </div>
            </>
        )
    }
}
Detail.propTypes = {
    slug: string
}
Detail.defaultProps = {
    slug: ''
}
export default Detail;