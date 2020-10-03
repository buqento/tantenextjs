import React from 'react'
import { string } from 'prop-types'
import { DataKos } from '../../utils/modals/fakeDb'
import Firstupper from '../../utils/Firstupper'
import HeadPage from '../../components/HeadPage'
import ListKos from '../../components/ListKos'
import NextHead from 'next/head'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.areaid }
    }

    render() {
        const { slug } = this.props;
        const data = DataKos.filter(item => item.location_title === slug)
        let headTitle = "";
        slug.split("-").map(index => headTitle += Firstupper(index) + " ")

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
                    "name": "Home"
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
                    "name": "${headTitle}"
                }
            }
        ]
       }`

        const structureTypeItemList =
            `{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Area ${headTitle}",
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
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <div className="main-layout">
                    <HeadPage title={headTitle} />
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