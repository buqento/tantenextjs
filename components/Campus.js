import React, { Component } from 'react'
import { Campus } from '../utils/modals/Campus'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
class ComponentCampus extends Component {
    render() {
        return (
            <div className="container grid grid-cols-2 gap-3 my-3">
                {
                    Campus
                        .sort(() => .5 - Math.random())
                        .slice(0, 8)
                        .map((item, index) =>
                            <Link key={index} href={`area/kampus/${Generateslug(item.name)}`}>
                                <div className="rounded-xl bg-gray-200 hover:bg-indigo-600 hover:text-white hover:font-bold text-center py-3 px-2 align-middle text-gray-900">
                                    <span className="clamp-2">{item.name}</span>
                                </div>
                            </Link>
                        )
                }
            </div>
        )
    }
}
export default ComponentCampus