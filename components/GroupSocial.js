import React, { Component } from 'react'
import { BiChevronRight } from "react-icons/bi"
class Area extends Component {
    render() {
        const group = [
            {
                name: 'Rumah/Kost/Kontrakan DKI Jakarta',
                url: 'https://www.facebook.com/groups/485414032435519'
            },
            {
                name: 'Rumah/Kost/Kontrakan Yogyakarta',
                url: 'https://www.facebook.com/groups/221285929390212'
            },
            {
                name: 'Rumah/Kost/Kontrakan Bali',
                url: 'https://www.facebook.com/groups/762731311013431'
            },
            {
                name: 'Rumah/Kost/Kontrakan Maluku',
                url: 'https://www.facebook.com/groups/tantekos'
            },
            {
                name: 'Rumah/Kost/Kontrakan Papua',
                url: 'https://www.facebook.com/groups/811913479639737'
            }
        ]
        return (
            <div className="my-3 mx-3 divide-y">
                {
                    group.map((item, index) =>
                        <div className="py-2" key={index}>
                            <a href={item.url} target="blank">
                                <span>{item.name}</span>
                                <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                            </a>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default Area