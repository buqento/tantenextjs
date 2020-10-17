import React from 'react'
import { string } from 'prop-types'
import { Kost } from '../../utils/modals/Kost'
import { DtArea } from '../../utils/modals/Area'
import HeadPage from '../../components/HeadPage'
import ListKos from '../../components/ListKos'
import NextHead from 'next/head'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.areaid }
    }

    render() {
        const { slug } = this.props;
        const data = Kost.filter(item => item.location.title === slug)
        const dataArea = DtArea.filter(item => item.slug === slug)
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
                    "@id": "https://tantekos.com/area",
                    "name": "Area"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@id": "https://tantekos.com/area/${slug}",
                    "name": "${dataArea[0].title}"
                }
            }
        ]
       }`
        const structureTypeItemList =
            `{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Area ${dataArea[0].title}",
            "itemListElement": [
                ${data.map((item, index) => `{
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "url": "https://tantekos.com/${item.slug}"
                }`)}
            ]
        }`
        const structureAreaPage = {
            '@graph': [
                JSON.parse(structureTypeItemList),
                JSON.parse(structureTypeBreadcrumbList)
            ]
        };
        return (
            <>
                <NextHead>
                    <title>Tantekos - Area {dataArea[0].title}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={`Kost Dan Kontrakan Murah Area ${dataArea[0].title}`} />
                    <meta name="description" content={`Tersedia Kost Dan Kontrakan Murah Area ${dataArea[0].title}`} />
                    <meta name="keywords" content={`tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, ${dataArea[0].title}`} />
                    <meta property="og:title" content={`Kost Dan Kontrakan Murah Area ${dataArea[0].title}`} />
                    <meta property="og:description" content={`Tersedia Kost Dan Kontrakan Murah Area ${dataArea[0].title}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://tantekos.com/area/${slug}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/${dataArea[0].image}`} />
                    <meta property="og:image:alt" content={dataArea[0].title} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/area/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <div className="main-layout">
                    <HeadPage title={`Area ${dataArea[0].title}`} />
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