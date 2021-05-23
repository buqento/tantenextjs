import React, { Component } from 'react'
import Link from 'next/link'
class Area extends Component {
    render() {
        const group = [
            {
                name: 'Kost Dan Kontrakan Daerah Khusus Ibukota Jakarta',
                url: 'https://www.facebook.com/groups/485414032435519',
                image: 'Aux8Yxk'
            },
            {
                name: 'Kost Dan Kontrakan Daerah Istimewa Yogyakarta',
                url: 'https://www.facebook.com/groups/221285929390212',
                image: '2nsyPfq'
            },
            {
                name: 'Kost Dan Kontrakan Provinsi Bali',
                url: 'https://www.facebook.com/groups/762731311013431',
                image: '34TAjvq'
            },
            {
                name: 'Kost Dan Kontrakan Provinsi Maluku & Maluku Utara',
                url: 'https://www.facebook.com/groups/tantekos',
                image: 'KokRrm7'
            },
            {
                name: 'Kost Dan Kontrakan Provinsi Papua & Papua Barat',
                url: 'https://www.facebook.com/groups/811913479639737',
                image: 'BuvhC73'
            },
            {
                name: 'Kost Dan Kontrakan Provinsi Sulawesi Selatan',
                url: 'https://www.facebook.com/groups/439907767456192',
                image: 'eYOZreq'
            },
            {
                name: 'Kost Dan Kontrakan Provinsi Sulawesi Utara',
                url: 'https://www.facebook.com/groups/1613843658805496',
                image: 'QmmyajL'
            }
        ]
        return (
            <div className="my-3 mx-3 divide-y">
                {
                    group.map((item, index) =>
                        <Link key={index} href={item.url}>
                            <div className="flex hover:text-indigo-700 py-2 align-middle items-center cursor-pointer">
                                <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.image}.webp`} alt={item.name} className="float-left h-20 w-20" style={{ objectFit: 'cover', objectPosition: 'center', width: '80px', height: '95px' }} />
                                <span className="mx-3 clamp-2 text-xl">{item.name}</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        )
    }
}
export default Area