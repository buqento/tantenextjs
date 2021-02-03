import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import fire from '../configurations/firebase'
import KostType from './Type'
import Facilities from './Facilities'
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
                <div className="w-full overflow-hidden py-2 flex" onClick={() => handleLastView(item)}>
                    <div className="h-20 w-20 bg-gray-400 rounded-xl">
                        <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="float-left mr-2 rounded-xl h-20 w-20" />
                    </div>
                    <div className="flex-1 mx-3 mr-3 mt-n1 self-center">
                        <div className="text-xl font-bold flex">
                            <div className="leading-none">
                                {Cash(item.price.start_from)}<span className="text-xs font-normal">/{item.price.duration}</span>
                            </div>
                            {
                                nearby ?
                                    <div className="w-full">
                                        <span className="float-right text-green-700 font-normal">{item.distance}Km</span>
                                    </div> :
                                    <div className="w-full">
                                        <span className="float-right text-sm">

                                            <KostType item={item.type} />
                                        </span>
                                    </div>
                            }
                        </div>
                        <Facilities items={item.facility.room} inline />
                        <div className="text-sm clamp-1 text-indigo-700">
                            <BiMap className="inline" size={16} /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                        </div>
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