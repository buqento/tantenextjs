import React from 'react'
import { string } from 'prop-types'
import { DtArea } from '../../utils/modals/Area'
import NavMobile from '../../components/NavMobile'
import Footer from '../../components/Footer'
import NextHead from 'next/head'
import Generateslug from '../../utils/Generateslug'
import fire from '../../configurations/firebase'
import Titlecase from '../../utils/Titlecase'
import CampaignItemList from '../../components/CampaignItemList'
import CampaignItemListSkeleton from '../../components/CampaignItemListSkeleton'
import Message from '../../components/Message'
import NavComponent from '../../components/NavComponent'
class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.areaid }
    }
    constructor(props) {
        super(props)
        this.state = { data: null, load: true }
    }
    async componentDidMount() {
        const { slug } = this.props;
        const docRef = await fire.firestore().collection('kosts')
            .where("location.district", "==", Titlecase(slug))
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, load: false })
        })
        docRef.get().catch(err => console.log(err))
    }
    render() {
        const { data, load } = this.state
        const { slug } = this.props
        const dataArea = DtArea.filter(item => Generateslug(item.district) === slug)
        let seoItem = { province: '', city: '', district: '', image: '' }
        if (dataArea.length > 0) seoItem = { province: dataArea[0].province, city: dataArea[0].city, district: dataArea[0].district, image: data && data[0].images[0] }
        const seo = {
            title: `${data && data.length} Room${data && data.length > 1 ? 's' : ''} in ${seoItem.district}, ${seoItem.city}, ${seoItem.province}`,
            description: `Cari kost dan kontrakan di area ${seoItem.district}, ${seoItem.city}, ${seoItem.province}`,
            keyword: `infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost di ${seoItem.district}, kost di ${seoItem.city}, kost di ${seoItem.province}`
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
                        "name": "${seoItem.district}"
                    }
                }
            ]
           }`
        const structureTypeItemList =
            `{
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Area ${seoItem.district}",
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
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${seoItem.image}`} />
                    <meta property="og:image:alt" content={seoItem.district} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content={seo.keyword} />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/area/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <NavComponent />
                <>
                    {load && <CampaignItemListSkeleton />}
                    {data && data.length === 0 && <Message title="No Room" message="Use search to view more rooms" />}
                    {
                        data && data.length > 0 &&
                        <h1 className="pt-3 px-3 font-bold bg-white"><span className="font-normal">{data.length} Room{data.length > 1 ? 's' : ''} in</span>  {seoItem.district}, {seoItem.city}, {seoItem.province}</h1>
                    }
                    <div className="mx-3 my-2 divide-y">
                        {data && data
                            .sort(function compare(a, b) {
                                const itemA = a.price.start_from
                                const itemB = b.price.start_from
                                let comparison = 0
                                if (itemA > itemB) comparison = 1
                                if (itemA < itemB) comparison = -1
                                return comparison
                            })
                            .map((item, index) =>
                                <div key={index}><CampaignItemList item={item} /></div>
                            )}
                    </div>
                </>
                <Footer />
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <NavMobile />
                </div>
            </>
        )
    }
}
Detail.propTypes = {
    slug: string
}
Detail.defaultProps = {
    slug: null
}
export default Detail;