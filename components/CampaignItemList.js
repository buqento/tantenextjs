import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import fire from '../configurations/firebase'
import KostType from './Type'
class CampaignItemList extends Component {
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
        const { item, nearby } = this.props
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
                <div className="w-full overflow-hidden py-2" onClick={() => handleLastView(item)}>
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="float-left mr-2 rounded-xl" width={100} height={100} />
                    <div className="mx-3 mt-n1">
                        <div className="text-lg font-bold flex">
                            <div className>
                                {Cash(item.price.start_from)}<span className="text-xs font-normal">/{item.price.duration}</span>
                            </div>
                            {
                                nearby &&
                                <div className="w-full">
                                    <span className="float-right text-green-700 font-normal">{item.distance}Km</span>
                                </div>
                            }
                        </div>
                        <div className="leading-none text-md clamp-2"><small>{item.title}</small></div>
                        <div className="text-md clamp-1">
                            <BiMap className="inline" /><small>{item.location.district}, {item.location.city}, {item.location.province}</small>
                        </div>
                        <KostType item={item.type} />
                    </div>
                </div>
            </Link>
        )
    }
}
CampaignItemList.propTypes = {
    item: shape({}),
    customStyle: string
}
CampaignItemList.defaultProps = {
    item: null,
    customStyle: null
}
export default CampaignItemList;