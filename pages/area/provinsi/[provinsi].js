import React from 'react'
import { string } from 'prop-types'
import { DtArea } from '../../../utils/modals/Area'
import { Kost } from '../../../utils/modals/Kost'
import { Kontrakan } from '../../../utils/modals/Kontrakan'
import HeadPage from '../../../components/HeadPage'
import NextHead from 'next/head'
import Generatelink from '../../../utils/Generatelink'
import Firstupper from '../../../utils/Firstupper'
import { Badge, ListGroup } from 'react-bootstrap'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.provinsi }
    }
    constructor(props) {
        super(props)
        this.getAmount = this.getAmount.bind(this)
    }
    getAmount(location) {
        return Kost.concat(Kontrakan).filter(item => item.location.title === location).length;
    }
    render() {
        const { slug } = this.props;
        const areaTitle = Firstupper(slug)
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
                    <HeadPage title={`Kost & Kontrakan ${Firstupper(slug)}`} />
                    <ListGroup variant="flush">
                        {
                            DtArea
                                .sort(function (a, b) {
                                    var nameA = Generatelink(a.title.toUpperCase());
                                    var nameB = Generatelink(b.title.toUpperCase());
                                    if (nameA < nameB) return -1;
                                    if (nameA > nameB) return 1;
                                    return 0;
                                })
                                .filter(item => item.province === slug)
                                .map((item, index) =>
                                    <ListGroup.Item action href={`../../area/${Generatelink(item.title)}`} key={index}>
                                        <span>
                                            {item.title}
                                        </span>
                                        <span className="float-right">
                                            <Badge variant="secondary">{this.getAmount(Generatelink(item.title))}</Badge>
                                        </span>
                                    </ListGroup.Item>
                                )
                        }
                    </ListGroup>
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