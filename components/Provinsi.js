import React, { Component } from 'react'
import { DtProvinsi } from '../utils/modals/Provinsi'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight, BiMap } from 'react-icons/bi'
class Area extends Component {
    render() {
        return (
            <div className="container grid grid-cols-2 gap-3 my-3">
                {
                    DtProvinsi
                        .sort(() => .5 - Math.random())
                        .slice(0, 10)
                        .map((item, index) =>
                            <Link key={index} href={`area/provinsi/${Generateslug(item.title)}`}>
                                <div className="rounded-xl bg-gray-200 hover:bg-indigo-700 hover:text-white hover:font-bold pt-2 px-2 h-60 align-middle uppercase clamp-1 border">
                                    <div className="pb-2">
                                        <BiMap className="inline mr-1 mb-1" /><span>{item.title}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                }
                {/* <Link href="area/provinsi/all">
                    <div key={6} className="text-center pt-1 px-3 text-indigo-700">
                        <span className="inline">Lihat Semua</span>
                        <BiChevronRight size={28} className="inline ml-1 mb-1" />
                    </div>
                </Link> */}
            </div>
        )
    }
}
export default Area