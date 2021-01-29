import React, { Component } from 'react'
import { Campus } from '../utils/modals/Campus'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import Titlecase from '../utils/Titlecase'
class ComponentCampus extends Component {
    render() {
        const TitleCase = (str, splitBy = ' ') => {
            str = str.toLowerCase().split(splitBy)
            return str[0].charAt(0) + str[1].charAt(0)
        }
        return (
            <div className="container">
                {
                    Campus
                        .sort(() => .5 - Math.random())
                        .slice(0, 5)
                        .map((item, index) =>
                            <Link key={index} href={`area/kampus/${Generateslug(item.name)}`}>
                                <div className="flex rounded-xl bg-gray-200 hover:bg-indigo-700 hover:text-white border py-2 px-2 my-2 align-middle text-gray-900 items-center ">
                                    <div class="m-1 mr-2 px-3 relative flex justify-center items-center rounded-lg hover:bg-gray-500 bg-indigo-700 text-xl text-white uppercase" style={{ width: '50px', height: '50px' }}>{TitleCase(item.name)}</div>
                                    <span className="clamp-2 leading-tight">{item.name}</span>
                                </div>
                            </Link>
                        )
                }
            </div>
        )
    }
}
export default ComponentCampus