import React, { Component } from 'react'
import { DtProvinsi } from '../utils/modals/Provinsi'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
class Area extends Component {
    render() {
        return (
            <div className="container grid grid-cols-2 gap-3 my-3">
                {
                    DtProvinsi
                        .sort(() => .5 - Math.random())
                        .slice(0, 7)
                        .map((item, index) =>
                            <Link key={index} href={`area/provinsi/${Generateslug(item.title)}`}>
                                <div className="rounded-xl bg-gray-200 text-center py-3 align-middle text-gray-900 uppercase">
                                    {item.title}
                                </div>
                            </Link>
                        )
                }
                <Link href="area/provinsi/all">
                    <div key={6} className="text-center py-3 px-3 text-indigo-700">
                        <span className="inline">Lihat Semua</span>
                        <BiChevronRight size={28} className="inline ml-1 mb-1" />
                    </div>
                </Link>
            </div>
        )
    }
}
export default Area