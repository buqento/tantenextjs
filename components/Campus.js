import React, { Component } from 'react'
import { Campus } from '../utils/modals/Campus'
import { BiMap } from 'react-icons/bi'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
class ComponentCampus extends Component {
    render() {
        const TitleCase = (str, splitBy = ' ') => {
            str = str.toLowerCase().split(splitBy)
            return str[0].charAt(0) + str[1].charAt(0)
        }
        return (
            <div className="container divide-y">
                {
                    Campus
                        .sort(() => .5 - Math.random())
                        .slice(0, 3)
                        .map((item, index) =>
                            <Link key={index} href={`area/kampus/${Generateslug(item.name)}`}>
                                <div className="w-full overflow-hidden py-2 flex">
                                    <div className="h-20 w-20 bg-indigo-700 text-white font-bold rounded-xl flex justify-center items-center uppercase text-4xl">{TitleCase(item.name)}</div>
                                    <div className="flex-1 mx-3 mr-3 mt-n1 self-center items-center cursor-pointer">
                                        <div className="text-xl clamp-2">
                                            {item.name}
                                        </div>
                                        <div className="text-md clamp-1">
                                            <BiMap className="inline" /><small>{item.province}</small>
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