import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import { MdStar } from 'react-icons/md'
import moment from 'moment'
import { facility, type, duration } from './Campaign'
class CampaignItem extends Component {
    constructor(props) {
        super(props)
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
        const { like } = this.state
        const { item, customStyle } = this.props
        const defaultEmail = process.env.NEXT_PUBLIC_REACT_APP_EMAIL
        const profileImage = item.user.email === defaultEmail ? '../static/images/user.jpg' : item.user.photo_url
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
                <div className={`my-3 border overflow-hidden ${customStyle}`} onClick={() => handleLastView()}>
                    <div className="flex mx-3 my-3">
                        <img src={profileImage} className="rounded-full mr-2 h-10 w-10 rounded-full" alt={item.user.display_name} />
                        <div className="mt-n1">
                            <div className="font-bold">
                                {item.user.email === defaultEmail ? 'Tantekos' : item.user.display_name}
                            </div>
                            <div>
                                <small className="text-gray-700 uppercase">{moment(item.date_modified).fromNow()} &middot; {item.hit} Views</small>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-400">
                        <picture>
                            <source media="(min-width:425px)" srcSet={`https://cdn.statically.io/img/i.imgur.com/w=425/${item.images[0]}`} />
                            <source media="(min-width:375px)" srcSet={`https://cdn.statically.io/img/i.imgur.com/w=375/${item.images[0]}`} />
                            <img className="object-cover object-center w-full h-64" src={`https://cdn.statically.io/img/i.imgur.com/h=256/${item.images[0]}`} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                        </picture>
                    </div>
                    <div className="mx-3 my-3">
                        <div className="text-2xl flex">
                            <div className="flex-auto font-bold">
                                <span>
                                    {like && <MdStar className="inline text-pink-500 mt-1 mr-1 float-right" />}
                                    {Cash(item.price.start_from, false)}
                                </span>
                                <span className="text-xs text-gray-700 uppercase"> / {duration(item.price.duration)}</span>
                            </div>
                            <div className="mt-2 text-sm underline uppercase text-indigo-700 font-bold">View More</div>
                        </div>
                        <div className="clamp-1">
                            <BiMap size={16} className="inline mr-1 mb-1" /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                        </div>
                        <div className="clamp-1">{facility(item.facility.room)} &middot; {facility(item.facility.bathroom)} &middot; {facility(item.facility.share)}</div>
                        <div className="text-sm uppercase mt-1 text-green-800 font-bold">{type(item.type)}</div>

                    </div>
                </div>
            </a>
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