import React from 'react'
import { DtArea } from '../../utils/modals/Area'
import HeadPage from '../../components/HeadPage'
import { Card } from 'react-bootstrap'
import Link from 'next/link'
import NextHead from 'next/head'
import Generatelink from '../../utils/Generatelink'

class AreaList extends React.Component {
    render() {
        return <>
            <NextHead>
                <title>Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia</title>
                <meta name="googlebot" content="index, follow" />
                <meta name="robot" content="index, follow" />
                <meta name="application-name" content="Tantekos" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta name="description" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta name="keywords" content="tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta property="og:title" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta property="og:description" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tantekos.com/area/" />
                <meta property="og:image" content="https://cdn.statically.io/img/i.imgur.com/w=300/i2aQSZ9.webpm" />
                <meta property="og:image:alt" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="Tantekos" />
                <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <link rel="canonical" content="https://tantekos.com/area" />
            </NextHead>
            <div className="main-layout">
                <HeadPage title="Semua Area" />
            </div>
            <div className="container pb-3">
                <div className="row">
                    {
                        DtArea
                            .sort(function (a, b) {
                                var nameA = Generatelink(a.title.toUpperCase());
                                var nameB = Generatelink(b.title.toUpperCase());
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .map((item, index) =>
                                <div key={index} className="col-6 pt-3">
                                    <Link href={`area/${Generatelink(item.title)}`}>
                                        <Card variant="top">
                                            <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=155/${item.image}`} alt={`Kost Dan Kontrakan Murah Di ${item.title} ${item.province}`} />
                                            <div className="mt-2 mr-2 mb-0 ml-2 text-center font-weight-bold">{item.title}</div>
                                            <div className="mt-0 mr-2 mb-2 ml-2 text-center text-uppercase text-secondary">
                                                <small>{item.province}</small>
                                            </div>
                                        </Card>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    }
}

export default AreaList;