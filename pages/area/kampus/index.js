import React, { useState } from 'react'
import Router from 'next/router'
import { Campus } from '../../../utils/modals/Campus'
import { DtProvinsi } from '../../../utils/modals/Provinsi'
import CampusList from '../../../components/CampusList'
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
        <>
            <div className="main-layout">
                <div className="d-flex sticky top-0 bg-white border-bottom">
                    <span onClick={() => Router.push('/')}>
                        <BiChevronLeft size={40} className="inline mb-3 mt-3 ml-2" />
                    </span>
                    <input className="w-full rounded-full px-4 my-3 mr-3 text-gray-700 leading-tight focus:outline-none font-medium border" id="name" type="text" placeholder="Masukan Nama Kampus" value={name} onChange={(e) => setName(e.target.value)}
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
            </div>
        </>
    )
}
export default Filter