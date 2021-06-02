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

                        <div className="flex py-3 align-middle items-center">
                            <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.image}.webp`} alt={item.name} className="float-left h-20 w-20" style={{ objectFit: 'cover', objectPosition: 'center', width: '80px', height: '95px' }} />
                            <div className="mx-3">
                                <div className="clamp-2 text-lg mb-2 mt-n2">{item.name}</div>
                                <Link key={index} href={item.url}>
                                    <span className="border rounded-lg p-2 cursor-pointer uppercase text-indigo-700 font-bold">Gabung Group</span>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default Area