import React, { Component } from 'react'
import Link from 'next/link'
class Area extends Component {
    render() {
        const group = [
            {
                name: 'Informasi Rumah, Kost, Kontrakan Daerah Khusus Ibukota Jakarta',
                url: 'https://www.facebook.com/groups/485414032435519',
                image: 'Aux8Yxk'
            },
            {
                name: 'Informasi Rumah, Kost, Kontrakan Daerah Istimewa Yogyakarta',
                url: 'https://www.facebook.com/groups/221285929390212',
                image: '2nsyPfq'
            },
            {
                name: 'Informasi Rumah, Kost, Kontrakan Daerah Bali',
                url: 'https://www.facebook.com/groups/762731311013431',
                image: '34TAjvq'
            },
            {
                name: 'Informasi Rumah, Kost, Kontrakan Daerah Maluku & Maluku Utara',
                url: 'https://www.facebook.com/groups/tantekos',
                image: 'KokRrm7'
            },
            {
                name: 'Informasi Rumah, Kost, Kontrakan Daerah Papua & Papua Barat',
                url: 'https://www.facebook.com/groups/811913479639737',
                image: 'BuvhC73'
            }
        ]
        return (
            <div className="my-3 mx-3 divide-y">
                {
                    group.map((item, index) =>
                        <Link key={index} href={item.url}>
                            <div className="flex hover:text-indigo-700 py-2 align-middle items-center cursor-pointer">
                                <img src={`https://cdn.statically.io/img/i.imgur.com/w=50/${item.image}.webp`} alt={item.name} className="float-left mr-2 rounded-lg" width={50} height={50} />
                                <span className="clamp-2">{item.name}</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        )
    }
}
export default Area