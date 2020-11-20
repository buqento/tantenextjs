import React, { Component } from 'react'
import { DtProvinsi } from '../utils/modals/Provinsi'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import { AiOutlineArrowRight } from 'react-icons/ai'
class Area extends Component {
    render() {
        return (
            <div className="container grid grid-cols-2 gap-3 my-3 text-indigo-700">
                {
                    DtProvinsi
                        .slice(0, 7)
                        .sort(() => .5 - Math.random())
                        .map((item, index) =>
                            <div key={index} className="shadow-md rounded-xl border border-indigo-500 text-center py-3 align-middle font-bold">
                                <Link href={`area/provinsi/${Generateslug(item.title)}`}>{item.title}</Link>
                            </div>
                        )
                }
                <Link href="area/provinsi/all">
                    <div key={6} className="text-center py-3 px-3">
                        <span className="inline">Lihat Semua</span>
                        <AiOutlineArrowRight className="inline ml-1 mb-1" />
                    </div>
                </Link>
            </div>
        )
    }
}
export default Area