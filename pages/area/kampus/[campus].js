import React from 'react'
import { string } from 'prop-types'
import NavComponent from '../../../components/NavComponent'
import NavMobile from '../../../components/NavMobile'
import Footer from '../../../components/Footer'
import Message from '../../../components/Message'
import fire from '../../../configurations/firebase'
import { Campus } from '../../../utils/modals/Campus'
import NextHead from 'next/head'
import ListComponent from '../../../components/ListComponent'
class University extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listResult: null,
            campusName: null
        }
        this.setData = this.setData.bind(this)
        this.getDistance = this.getDistance.bind(this)
    }
    componentDidMount() {
        const { slug } = this.props
        const campus = Campus.filter(campus => campus.slug === slug)
        const lat = parseFloat(campus[0].latlng.split(", ")[0])
        const lng = parseFloat(campus[0].latlng.split(", ")[1])
        this.setState({ campusName: campus[0].name, listResult: this.setData(lat, lng) })
    }
    setData(lat, lng) {
        const { kosts } = this.props
        const data = JSON.parse(kosts)
        let res = []
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(lat, lng, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
            if (d <= 3) res.push({
                facility: data[i].facility,
                images: data[i].images,
                location: data[i].location,
                name: data[i].name,
                price: data[i].price,
                slug: data[i].slug,
                title: data[i].title,
                type: data[i].type
            })
        }
        return res
    }
    getDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) dist = 1
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") dist = dist * 1.609344
        if (unit == "N") dist = dist * 0.8684
        return dist
    }
    render() {
        const { listResult, campusName } = this.state
        const { slug } = this.props
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
                        "name": "${campusName}"
                    }
                }
            ]
           }`
        const structureTypeItemList =
            `{
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Dekat Kampus ${campusName}",
                "itemListElement": [
                    ${listResult && listResult.map((item, index) => `{
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
        }
        const images = ['tt9t2IU', 'NaAULjD', 'RSbvRHn', 'DnxVdqt', 'kOuWQYi', 'TjA9SEq', 'stmSYZ2', 'yXRAu9W', 'rtX3zp9', 'i2aQSZ9']
        const rand = Math.floor(Math.random() * 10)
        return (
            <>
                <NextHead>
                    <title>Infokost kost murah kost eksklusif kost mewah kost bebas dekat kampus {campusName}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={`Infokost kost murah kost eksklusif kost mewah kost bebas dekat kampus ${campusName}`} />
                    <meta name="description" content={`Informasi kost dekat kampus ${campusName}. Kost putri, kost putra, kost pasutri, kost campur. Kost harian, kost bulanan, kost mingguan, dan kost tahunan. Kost murah, kost eksklusif, dan kost bebas. Kost di Jogja, Makassar, Jakarta, Medan, Bandung, Malang, Surabaya, Manado, Denpasar, dan Palembang.`} />
                    <meta name="keywords" content={`infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost murah, kost dekat ${campusName}`} />
                    <meta property="og:title" content={`Infokost kost murah kost eksklusif kost mewah kost bebas dekat kampus ${campusName}`} />
                    <meta property="og:description" content={`Informasi kost dekat kampus ${campusName}. Kost putri, kost putra, kost pasutri, kost campur. Kost harian, kost bulanan, kost mingguan, dan kost tahunan. Kost murah, kost eksklusif, dan kost bebas. Kost di Jogja, Makassar, Jakarta, Medan, Bandung, Malang, Surabaya, Manado, Denpasar, dan Palembang.`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://tantekos.com/area/kampus/${slug}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${images[rand]}.webp`} />
                    <meta property="og:image:alt" content={campusName} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content={`infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost murah`} />
                    <meta name="classification" content="Sewa Kost, Property, Rent House, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Eksklusif, Kost Bebas, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, Kost Mingguan, Kost Bulanan, Kost Tahunan" />
                    <link rel="canonical" content={`https://tantekos.com/area/kampus/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <NavComponent />
                <div className="mx-2 mt-2">
                    <div className="my-2">
                        {
                            listResult &&
                            <>
                                <span className="font-bold">
                                    {
                                        listResult.length > 0 &&
                                        `${listResult.length} Room${listResult.length > 1 ? 's' : ''} Near ${campusName}`
                                    }
                                </span>
                                {
                                    listResult.length === 0 && campusName &&
                                    <Message title="No Room" message={`No room near ${campusName}. Use search to view more rooms`} />
                                }
                            </>
                        }
                    </div>
                    {
                        listResult && listResult.length > 0 && <ListComponent data={listResult} />
                    }
                </div>
                <Footer />
                <NavMobile />
            </>
        )
    }
}
export const getServerSideProps = async (context) => {
    let kosts = []
    const querySnapshot = await fire.firestore().collection('kosts')
        .where('is_active', '==', true)
        .get()
    querySnapshot.forEach(doc => {
        kosts.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return {
        props: {
            slug: context.query.campus,
            kosts: JSON.stringify(kosts)
        }
    }
}
University.propTypes = {
    slug: string,
    kosts: string
}
University.defaultProps = {
    slug: null,
    kosts: null
}
export default University