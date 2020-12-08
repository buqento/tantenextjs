import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import HeadPage from '../../../components/HeadPage'
import ListKos from '../../../components/ListKos'
import Generateslug from '../../../utils/Generateslug'
import fire from '../../../config/fire-config'
import Titlecase from '../../../utils/Titlecase'
import { Campus } from '../../../utils/modals/Campus'

class CampusId extends React.Component {
    static async getInitialProps(ctx) { return { slug: ctx.query.campus } }
    constructor(props) {
        super(props)
        this.state = { data: null }
    }
    async componentDidMount() {
        const { slug } = this.props
        const campus = Campus.filter(campus => campus.slug === slug)
        const docRef = await fire.firestore().collection('kosts')
            .where("location.near", "array-contains", campus[0].name)
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data })
        })
        docRef.get().catch(err => console.log(err))
    }
    render() {
        const { data } = this.state
        const { slug } = this.props
        const title = Titlecase(slug)
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
                        "@id": "https://tantekos.com/area/kampus",
                        "name": "Kampus"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@id": "https://tantekos.com/area/kampus/${slug}",
                        "name": "${title}"
                    }
                }
            ]
           }`
        const structureTypeItemList =
            `{
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Dekat Kampus ${title}",
                "itemListElement": [
                    ${data && data.map((item, index) => `{
                        "@type": "ListItem",
                        "position": ${index + 1},
                        "url": "https://tantekos.com/${Generateslug(item.title)}"
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
                    <title>Tantekos - Kost &amp; Kontrakan Dekat Kampus {title}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={`Kost Dan Kontrakan Murah Dekat Kampus ${title}`} />
                    <meta name="description" content={`Tersedia Kost Dan Kontrakan Murah Area ${title}`} />
                    <meta name="keywords" content={`tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, ${title}`} />
                    <meta property="og:title" content={`Kost Dan Kontrakan Murah Dekat Kampus ${title}`} />
                    <meta property="og:description" content={`Tersedia Kost Dan Kontrakan Murah Dekat Kampus ${title}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://tantekos.com/area/${slug}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/${data && data.length > 0 && data[0].image}`} />
                    <meta property="og:image:alt" content={title} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/area/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <div className="main-layout">
                    <HeadPage title={`Kost & Kontrakan Dekat ${Titlecase(slug)}`} />
                    <ListKos data={data} />
                </div>
            </>
        )
    }
}
CampusId.propTypes = {
    slug: string
}
CampusId.defaultProps = {
    slug: null
}
export default CampusId;