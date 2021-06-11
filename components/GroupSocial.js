import React, { Component } from 'react'
import { FacebookProvider, Group } from 'react-facebook'
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
                        <div key={index} className="py-3 text-center">
                            <FacebookProvider appId={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID}>
                                <Group
                                    href={item.url}
                                    width="320"
                                    showSocialContext={true}
                                    showMetaData={true}
                                    skin="light"
                                />
                            </FacebookProvider>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default Area