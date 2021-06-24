import React, { Component } from 'react'
import { Campus } from '../utils/modals/Campus'
import { BiMap } from 'react-icons/bi'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
class ComponentCampus extends Component {
    render() {
        return (
            <div className="container divide-y">
                {
                    Campus
                        .sort(() => .7 - Math.random())
                        .slice(0, 7)
                        .map((item, index) =>
                            <Link key={index} href={`area/kampus/${Generateslug(item.name)}`}>
                                <div className="w-full overflow-hidden py-2">
                                    <div className="flex-1 mx-3 mr-3 mt-n1 self-center items-center cursor-pointer">
                                        <div className="text-xl clamp-1 leading-tight mb-2 font-bold text-gray-800">
                                            {item.name}
                                        </div>
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
export default ComponentCampus