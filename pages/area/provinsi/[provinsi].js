import React from 'react'
import { string } from 'prop-types'
import { DtArea } from '../../../utils/modals/Area'
import { DtProvinsi } from '../../../utils/modals/Provinsi'
import { Kost } from '../../../utils/modals/Kost'
import { Kontrakan } from '../../../utils/modals/Kontrakan'
import HeadPage from '../../../components/HeadPage'
import NextHead from 'next/head'
import Generateslug from '../../../utils/Generateslug'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.provinsi }
    }
    constructor(props) {
        super(props)
        this.getAmount = this.getAmount.bind(this)
    }
    getAmount(location) {
        const { slug } = this.props
        const amount = slug !== 'all' ? 
        Kost.concat(Kontrakan).filter(item => Generateslug(item.location.title) === location).length
        :
        Kost.concat(Kontrakan).filter(item => Generateslug(item.location.province) === location).length
        return amount 
    }
    render() {
        const { slug } = this.props;
        const areaTitle = slug !== 'all' ? DtProvinsi.filter(item => Generateslug(item.title) === slug)[0].title : 'Indonesia'
        return (
            <>
                <NextHead>
                    <title>Kost &amp; Kontrakan Murah Di {areaTitle}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={`Kost Dan Kontrakan Murah Area ${areaTitle}`} />
                    <meta name="description" content={`Tersedia Kost Dan Kontrakan Murah Area ${areaTitle}`} />
                    <meta name="keywords" content={`tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, ${areaTitle}`} />
                    <meta property="og:title" content={`Kost Dan Kontrakan Murah Area ${areaTitle}`} />
                    <meta property="og:description" content={`Tersedia Kost Dan Kontrakan Murah Area ${areaTitle}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://tantekos.com/area/${slug}`} />
                    <meta property="og:image" content="https://cdn.statically.io/img/i.imgur.com/w=300/i2aQSZ9.webpm" />
                    <meta property="og:image:alt" content={areaTitle} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/area/provinsi/${slug}`} />
                </NextHead>
                <div className="main-layout">
                    <HeadPage title={`Kost & Kontrakan di ${areaTitle}`} />
                    <div className="container divide-y sm:divide-y-2 md:divide-y-4 lg:divide-y-8 xl:divide-y-0 divide-gray-400">
                        {
                            slug != 'all' ?
                                DtArea
                                    .sort(function (a, b) {
                                        var nameA = Generateslug(a.title.toUpperCase());
                                        var nameB = Generateslug(b.title.toUpperCase());
                                        if (nameA < nameB) return -1;
                                        if (nameA > nameB) return 1;
                                        return 0;
                                    })
                                    .filter(item => Generateslug(item.province) === slug)
                                    .map((item, index) =>
                                        <div className="py-3 px-3" key={index}>
                                            <a href={`../../area/${Generateslug(item.title)}`}>
                                                <div>
                                                    <span>{item.title}</span>
                                                    <span className="float-right text-xs font-semibold inline-block py-1 px-2 uppercase text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1">
                                                        {this.getAmount(Generateslug(item.title))}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                :
                                DtProvinsi
                                    .sort(function (a, b) {
                                        var nameA = Generateslug(a.title.toUpperCase());
                                        var nameB = Generateslug(b.title.toUpperCase());
                                        if (nameA < nameB) return -1;
                                        if (nameA > nameB) return 1;
                                        return 0;
                                    })
                                    .map((item, index) =>
                                        <div className="py-3 px-3" key={index}>
                                            <a href={`../../area/provinsi/${Generateslug(item.title)}`}>
                                                <div>
                                                    <span>{item.title}</span>
                                                    <span className="float-right text-xs font-semibold inline-block py-1 px-2 text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1">
                                                        {this.getAmount(Generateslug(item.title))}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    )
                        }
                    </div>
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