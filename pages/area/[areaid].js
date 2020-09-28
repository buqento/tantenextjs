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

        return (
            <>
                <NextHead>
                    {/* <script type="application/ld+json">{structureTypeBreadcrumbList}</script> */}
                    <script 
                    type="application/ld+json" 
                    // dangerouslySetInnerHTML={structureTypeBreadcrumbList} 
            dangerouslySetInnerHTML={{ __html: structureTypeBreadcrumbList }}
                    />

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