import React from 'react'
import { string } from 'prop-types'
import { DtArea } from '../../utils/modals/Area'
import NavMobile from '../../components/NavMobile'
import NextHead from 'next/head'
import Generateslug from '../../utils/Generateslug'
import fire from '../../configurations/firebase'
import Titlecase from '../../utils/Titlecase'
import Message from '../../components/Message'
import NavComponent from '../../components/NavComponent'
import ListComponent from '../../components/ListComponent'
import Footer from '../../components/Footer'
class Area extends React.Component {
    render() {
        const { slug, areas, locations } = this.props
        const area = JSON.parse(areas)
        const location = JSON.parse(locations)
        const seo = {
            title: `${area.length} Room${area.length > 1 ? 's' : ''} in ${location.district}, ${location.city}, ${location.province}`,
            description: `Masih ada ${area.length} kost bebas, kost campur, kost putra, kost putri dan kost pasutri tersedia di area ${location.district}, ${location.city}, ${location.province}.`,
            keyword: `infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost di ${location.district}, kost di ${location.city}, kost di ${location.province}`,
            image: area[0].images[0],
            location
        }
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
                        "name": "${seo.location.district}"
                    }
                }
            ]
           }`
        const structureTypeItemList =
            `{
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Area ${seo.location.district}",
                "itemListElement": [
                    ${area && area.map((item, index) => `{
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
        }
        return (
            <>
                <NextHead>
                    <title>{seo.title}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={seo.title} />
                    <meta name="description" content={seo.description} />
                    <meta name="keywords" content={seo.keyword} />
                    <meta property="og:title" content={seo.title} />
                    <meta property="og:description" content={seo.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://tantekos.com/area/${slug}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${seo.image}`} />
                    <meta property="og:image:alt" content={seo.location.district} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content={seo.keyword} />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/area/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <NavComponent />
                <div className="px-2">
                    {area.length === 0 && <Message title="No Room" message="Use search to view more rooms" />}
                    {area.length > 0 && <h1 className="py-2 font-bold bg-white">{seo.title}</h1>}
                    <ListComponent data={area} />
                </div>
                <Footer />
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <NavMobile />
                </div>
            </>
        )
    }
}
export const getServerSideProps = async (context) => {
    let areas = []
    const querySnapshot = await fire.firestore().collection('kosts')
        .where("location.district", "==", Titlecase(context.query.areaid))
        .where('is_active', '==', true)
        .get()
    querySnapshot.forEach(doc => {
        areas.push({ id: doc.id, ...doc.data() })
    })
    if (areas.length === 0) return {
        redirect: { permanent: false, destination: '/' }
    }
    const dataArea = DtArea.filter(item => Generateslug(item.district) === context.query.areaid)
    let locations
    if (dataArea.length > 0) locations = { province: dataArea[0].province, city: dataArea[0].city, district: dataArea[0].district }
    return {
        props: {
            slug: context.query.areaid,
            areas: JSON.stringify(areas),
            locations: JSON.stringify(locations)
        }
    }
}
Area.propTypes = {
    slug: string,
    areas: string,
    locations: string
}
Area.defaultProps = {
    slug: null,
    areas: null,
    locations: null
}
export default Area;