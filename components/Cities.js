import React, { Component } from 'react'
import { City } from '../utils/modals/City'
import { BiMap } from 'react-icons/bi'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
class ComponentCities extends Component {
    render() {
        return (
            <div className="container divide-y">
                {
                    City
                        .filter(item => item.is_popular === true)
                        .map((item, index) =>
                            <Link key={index} href={`area/kota/${Generateslug(item.name)}`}>
                                <div className="w-full overflow-hidden py-2">
                                    <div className="flex-1 mt-n1 self-center items-center cursor-pointer">
                                        <div className="text-xl text-gray-800 clamp-2 leading-tight mb-2 font-bold">{item.name}</div>
                                        <div className="text-sm clamp-1 text-indigo-700 uppercase">
                                            <BiMap className="inline mr-1 mb-1" size={16} /><span>{item.province}</span>
                                            <span className="ml-0.5 float-right self-center"><BiChevronRight size={20} className="inline ml-1 mb-1" /></span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                }
            </div>
        )
    }
}
export default ComponentCities