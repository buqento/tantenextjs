import React, { useState } from 'react'
import NextHead from 'next/head'
import { Campus } from '../../../utils/modals/Campus'
import { DtProvinsi } from '../../../utils/modals/Provinsi'
import CampusList from '../../../components/CampusList'
import Generateslug from '../../../utils/Generateslug'
import NavComponent from '../../../components/NavComponent'
import Footer from '../../../components/Footer'
import NavMobile from '../../../components/NavMobile'
const Filter = () => {
    const [name, setName] = useState("")
    const filterItems = (keyword) => {
        let query = keyword.toLowerCase();
        return Campus.filter(item => item.name.toLowerCase().indexOf(query) >= 0);
    }
    const data = filterItems(name)
    return (
        <>
            <NextHead>
                <title>Tantekos - Kost &amp; Kontrakan Dekat Kampus</title>
                <meta name="googlebot" content="index, follow" />
                <meta name="robot" content="index, follow" />
                <meta name="application-name" content="Tantekos" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content="Kost Dan Kontrakan Murah Dekat Kampus" />
                <meta name="description" content="Tersedia Kost Dan Kontrakan Murah Dekat Kampus" />
                <meta name="keywords" content="tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, Kost Dekat Kampus" />
                <meta property="og:title" content="Kost Dan Kontrakan Murah Dekat Kampus" />
                <meta property="og:description" content="Tersedia Kost Dan Kontrakan Murah Dekat Kampus" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tantekos.com/area/kampus" />
                <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/yXRAu9W`} />
                <meta property="og:image:alt" content="Kost Dekat Kampus" />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="Tantekos" />
                <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, Kost Dekat Kampus" />
                <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, Kost Dekat Kampus" />
                <link rel="canonical" content="https://tantekos.com/area/kampus" />
            </NextHead>
            <NavComponent />
            <div className="d-flex sticky top-0 bg-white border-bottom">
                <input className="w-full rounded-full px-4 py-3 my-3 mx-3 text-gray-700 leading-tight focus:outline-none font-medium border" id="name" type="text" placeholder="Masukan Nama Kampus" value={name} onChange={(e) => setName(e.target.value)} />
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
                    .map(provinsi =>
                        <CampusList name={name} locationProvince={provinsi.title} />
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