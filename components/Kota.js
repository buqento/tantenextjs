import React, { Component } from 'react'
import { City } from '../utils/modals/City'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
class Kota extends Component {
    render() {
        return (
            <div className="container my-3">
                {
                    City
                        .sort(() => .5 - Math.random())
                        .slice(0, 5)
                        .map((item, index) =>
                            <Link key={index} href={`area/kota/${Generateslug(item.name)}`}>
                                <div className="rounded-xl bg-gray-200 hover:bg-indigo-700 hover:text-white hover:font-bold pt-2 px-3 h-60 align-middle capitalize clamp-1 border my-2">
                                    <div className="pb-1 my-2 uppercase">
                                        <BiMap className="inline mr-2 mb-1" /><span>{item.name}, {item.province}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                }
            </div>
        )
    }
}
export default Kota