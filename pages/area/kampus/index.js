import React, { useState } from 'react'
import Router from 'next/router'
import { Campus } from '../../../utils/modals/Campus'
import { DtProvinsi } from '../../../utils/modals/Provinsi'
import CampusList from '../../../components/CampusList'
import Layout from '../../../components/Layout'
import Generateslug from '../../../utils/Generateslug'
import { BiChevronLeft } from 'react-icons/bi'
const Filter = () => {
    const [name, setName] = useState("")
    const filterItems = (keyword) => {
        let query = keyword.toLowerCase();
        return Campus.filter(item => item.name.toLowerCase().indexOf(query) >= 0);
    }
    const data = filterItems(name)
    return (
        <Layout>
            <div className="d-flex sticky top-0 bg-white border-bottom">
                <input className="w-full rounded-full px-4 py-3 my-3 mx-3 text-gray-700 leading-tight focus:outline-none font-medium border" id="name" type="text" placeholder="Masukan Nama Kampus" value={name} onChange={(e) => setName(e.target.value)}
                />
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
        </Layout>
    )
}
export default Filter