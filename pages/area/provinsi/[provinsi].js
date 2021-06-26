import React from 'react'
import { string } from 'prop-types'
import { DtArea } from '../../../utils/modals/Area'
import { DtProvinsi } from '../../../utils/modals/Provinsi'
import HeadPage from '../../../components/HeadPage'
import NextHead from 'next/head'
import Generateslug from '../../../utils/Generateslug'
import Titlecase from '../../../utils/Titlecase'
import { BiChevronRight, BiMap } from 'react-icons/bi'
import Link from 'next/link'
import NavComponent from '../../../components/NavComponent'
import Footer from '../../../components/Footer'
import NavMobile from '../../../components/NavMobile'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.provinsi }
    }
    constructor(props) {
        super(props)
        this.handleCollapse = this.handleCollapse.bind(this)
    }
    handleCollapse(id) {
        document.getElementById(id).checked = true;
    }
    render() {
        const { slug } = this.props;
        const areaTitle = slug !== 'all' ? 'Area ' + Titlecase(slug) : 'Semua Wilayah'
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
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" content={`https://tantekos.com/area/provinsi/${slug}`} />
                </NextHead>
                <NavComponent />
                <>
                    <div className="mx-3 divide-y divide-gray-400">
                        {
                            slug != 'all' ?
                                DtArea
                                    .sort(function (a, b) {
                                        var nameA = Generateslug(a.district.toUpperCase());
                                        var nameB = Generateslug(b.district.toUpperCase());
                                        if (nameA < nameB) return -1;
                                        if (nameA > nameB) return 1;
                                        return 0;
                                    })
                                    .filter(item => Generateslug(item.province) === slug)
                                    .map((item, index) =>
                                        <div className="py-3 px-3 cursor-pointer" key={index}>
                                            <Link href={`../../area/${Generateslug(item.district)}`}>
                                                <div>
                                                    <span>{item.district}</span>
                                                    <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                                                </div>
                                            </Link>
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
                                    .map((itemProvinsi, index) =>
                                        <div className="tab w-full overflow-hidden" key={index}>
                                            <input className="absolute opacity-0" id={index} type="radio" name="tabs2" />
                                            <label htmlFor={index} className="block pt-3 pb-2 leading-normal cursor-pointer uppercase" onClick={() => this.handleCollapse(index)}>
                                                <BiMap className="inline mr-1 mb-1" /><span>{itemProvinsi.title}</span></label>
                                            <div className="tab-content overflow-hidden leading-normal">
                                                {
                                                    DtArea
                                                        .sort(function (a, b) {
                                                            var nameA = Generateslug(a.district.toUpperCase());
                                                            var nameB = Generateslug(b.district.toUpperCase());
                                                            if (nameA < nameB) return -1;
                                                            if (nameA > nameB) return 1;
                                                            return 0;
                                                        })
                                                        .filter(item => Generateslug(item.province) === Generateslug(itemProvinsi.title))
                                                        .map((item, index) =>
                                                            <div className="py-3 px-3 bg-gray-100" key={index}>
                                                                <Link href={`../../area/${Generateslug(item.district)}`}>
                                                                    <div>
                                                                        <span>{item.district}</span>
                                                                        <span className="float-right"><a href="/search/category/Kost"><BiChevronRight size={28} className="inline ml-1 mb-1" /></a></span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    )
                        }
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
    slug: ''
}
export default Detail;