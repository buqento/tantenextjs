import React, { useState } from 'react'
import Router from 'next/router'
import { Campus } from '../../../utils/modals/Campus'
import Generateslug from '../../../utils/Generateslug'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
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
                    <input className="w-full rounded-full px-4 my-3 mr-3 text-gray-700 leading-tight focus:outline-none font-bold border" id="name" type="text" placeholder="Cari Sekitar Kampus" value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="container divide-y divide-gray-400">
                    {
                        data
                            .sort(function (a, b) {
                                var nameA = Generateslug(a.name.toUpperCase());
                                var nameB = Generateslug(b.name.toUpperCase());
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .map((item, index) =>
                                <div className="py-3 px-3" key={index}>
                                    <a href={`../../area/kampus/${Generateslug(item.name)}`}>
                                        <div className="d-flex">
                                            <span className="w-full">{item.name}</span>
                                            <span className="ml-0.5 float-right self-center"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
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
export default Filter