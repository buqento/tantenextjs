import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import { MdStar } from 'react-icons/md'
import fire from '../configurations/firebase'
import Facilities from './Facilities'
class CampaignItem extends Component {
    constructor(props) {
        super(props);
        this.state = { like: false }
    }
    componentDidMount() {
        const { item } = this.props
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        const findFav = userdataFav.filter(i => i.id === item.id).length
        if (findFav > 0) this.setState({ like: true })
    }
    async handleHit(id, hit) {
        await fire.firestore().collection("kosts").doc(id).update({ hit })
            .catch(err => { console.log(err) })
    }
    render() {
        const { like } = this.state;
        const { item, customStyle } = this.props
        const newItem = {
            category: item.category,
            date_view: Date.now(),
            facility: { bathroom: item.facility.bathroom, building: item.facility.building, share: item.facility.share, room: item.facility.room },
            id: item.id,
            images: item.images,
            location: {
                city: item.location.city, district: item.location.district, near: item.location.near, province: item.location.province
            },
            name: item.name,
            price: { start_from: item.price.start_from, duration: item.price.duration },
            slug: item.slug,
            title: item.title,
            type: item.type
        }
        const handleLastView = () => {
            this.handleHit(item.id, item.hit + 1)
            let lastView = localStorage.getItem('lastview')
            let data
            if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
            const findData = data.filter(i => i.id === newItem.id).length
            if (data.length > 14) { data.shift() }
            if (findData === 0) {
                data.push(newItem)
                localStorage.setItem('lastview', JSON.stringify(data))
            }
        }
        return (
            <Link href={`/${Generateslug(item.title)}`}>
                <div className={`rounded-xl overflow-hidden border ${customStyle}`} onClick={() => handleLastView()}>
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} />
                    <div className="px-2 pt-2 pb-2">
                        <div className="text-xl">
                            <span className="font-bold">
                                {like && <MdStar className="inline text-pink-500 mt-1 mr-1 float-right" />}
                                {Cash(item.price.start_from, false)}
                            </span>
                            <span className="text-xs text-gray-700">/{item.price.duration}</span>
                        </div>
                        {
                            item.category === 'Kost' ? item.facility.room.length > 0 && <Facilities items={item.facility.room} inline />
                                : <Facilities items={item.facility.building} inline />
                        }
                        <div className="text-sm clamp-1">
                            <BiMap className="inline" /><small>{item.location.district}, {item.location.province}</small>
                        </div>
                        <div className="text-xs font-bold uppercase">
                            {
                                item.type.includes("Campur") &&
                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">{item.category === 'Kost' ? 'Campur' : 'Kontrakan'}</small>
                            }
                            {
                                item.type.includes("Putri") &&
                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">Putri</small>
                            }
                            {
                                item.type.includes("Putra") &&
                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">Putra</small>
                            }
                            {
                                item.type.includes("Pasutri") &&
                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">Pasutri</small>
                            }
                            {
                                item.type.includes("LV") &&
                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">LV</small>
                            }
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
CampaignItem.propTypes = {
    item: shape({}),
    customStyle: string
}
CampaignItem.defaultProps = {
    item: null,
    customStyle: null
}
export default CampaignItem;