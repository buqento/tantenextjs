import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import Duration from './Duration'
import { facility, type } from './Campaign'
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
    render() {
        const { item, nearby, myads } = this.props
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
            <a className="hover:text-current" href={`/${Generateslug(item.title)}`}>
                <div className="cursor-pointer w-full overflow-hidden py-2 flex" onClick={() => handleLastView(item)}>
                    <div className="w-20 bg-gray-400">
                        <img src={`https://cdn.statically.io/img/i.imgur.com/${item.images[0]}`} alt={item.title} className="object-cover object-center float-left mr-2 h-24 w-20" onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                    </div>
                    <div className="flex-1 ml-2 self-center">
                        <div className="text-xl font-bold flex">
                            <div className="font-bold">
                                {Cash(item.price.start_from)}<span className="text-xs uppercase"> / {Duration(item.price.duration)}</span>
                            </div>
                            {
                                nearby &&
                                <div className="w-full">
                                    <span className="float-right text-green-700 text-xs mr-1 rounded-full inline-block px-1 border">{item.distance} Km</span>
                                </div>
                            }
                            {
                                myads && <div className="text-sm uppercase w-full">{item.is_active ?
                                    <span className="float-right text-green-700 rounded-full px-1 border">Active</span> :
                                    <span className="float-right text-indigo-700 rounded-full px-1 border">Waiting</span>
                                }</div>
                            }
                        </div>
                        <div className="clamp-1">
                            <BiMap size={16} className="inline mr-1 mb-1" /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                        </div>
                        <div className="clamp-1 leading-none">{facility(item.facility.room)}</div>
                        <div className="w-full">
                            <span className="text-green-700 text-xs uppercase font-bold">
                                {type(item.type)}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
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