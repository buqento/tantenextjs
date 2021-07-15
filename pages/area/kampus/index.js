import React, { useState } from 'react'
import NextHead from 'next/head'
import { DtProvinsi } from '../../../utils/modals/Provinsi'
import CampusList from '../../../components/CampusList'
import Generateslug from '../../../utils/Generateslug'
import NavComponent from '../../../components/NavComponent'
import Footer from '../../../components/Footer'
import NavMobile from '../../../components/NavMobile'
const Filter = () => {
    const [name, setName] = useState("")
    const images = ['tt9t2IU', 'NaAULjD', 'RSbvRHn', 'DnxVdqt', 'kOuWQYi', 'TjA9SEq', 'stmSYZ2', 'yXRAu9W', 'rtX3zp9', 'i2aQSZ9'
    ]
    const rand = Math.floor(Math.random() * 10)
    const seo = {
        url: "https://tantekos.com/area/kampus",
        title: "Infokost kost murah kost eksklusif kost mewah kost bebas dekat kampus",
        description: "Informasi kost dekat kampus. Kost putri dekat kampus, kost putra dekat kampus, kost pasutri dekat kampus, kost campur dekat kampus. Kost harian dekat kampus, kost bulanan dekat kampus, kost mingguan dekat kampus, dan kost tahunan dekat kampus. Kost murah dekat kampus, kost eksklusif dekat kampus, dan kost bebas dekat kampus. Kost dekat kampus di Jogja, Makassar, Jakarta, Medan, Bandung, Malang, Surabaya, Manado, Denpasar, dan Palembang.",
        keyword: "infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, kost murah, kost dekat kampus"
    }
    return (
        <>
            <NextHead>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="googlebot" content="index, follow" />
                <meta name="robot" content="index, follow" />
                <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
                <meta name="application-name" content="Tantekos" />
                <meta name="classification" content="Sewa Kost, Property, Rent House, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Eksklusif, Kost Bebas, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, Kost Mingguan, Kost Bulanan, Kost Tahunan" />
                <meta name="keywords" content={seo.keyword} />
                <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${images[rand]}.webp`} />
                <meta property="og:image:alt" content={seo.title} />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="Tantekos" />
                <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                <meta name="keyphrases" content={seo.keyword} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={seo.url} />
                <link rel="canonical" content={seo.url} />
            </NextHead>
            <NavComponent />
            <div className="d-flex z-10 sticky top-0 bg-white border-b">
                <input className="w-full rounded p-2 my-3 mx-2 text-gray-700 leading-tight focus:outline-none font-medium border" id="name" type="text" placeholder="University/School/Campus" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {
                DtProvinsi
                    .sort(function (a, b) {
                        var nameA = Generateslug(a.title.toUpperCase());
                        var nameB = Generateslug(b.title.toUpperCase());
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    })
                    .map((provinsi, index) =>
                        <CampusList name={name} locationProvince={provinsi.title} key={index} />
                    )
            }
            <Footer />
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </>
    )
}
export default Filter