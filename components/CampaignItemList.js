import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import fire from '../configurations/firebase'
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
        const { like } = this.state;
        const { item, customStyle } = this.props
        const newItem = {
            date_view: Date.now(),
            facility: { bathroom: item.facility.bathroom, building: item.facility.building, share: item.facility.share, room: item.facility.room },
            id: item.id,
            images: item.images,
            price: { start_from: item.price.start_from, duration: item.price.duration },
            slug: item.slug,
            title: item.title
        }
        const handleLastView = () => {
            this.handleHit(item.id, item.hit === undefined ? 1 : item.hit + 1)
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
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="float-left mr-2" />
                    <div className="mx-3 mt-n1">
                        <div className="text-lg font-bold">
                            {Cash(item.price.start_from)}<span className="text-xs font-normal">/{item.price.duration}</span>
                        </div>
                        <div className="leading-none clamp-2"><small>{item.title}</small></div>
                        <div className="text-sm clamp-1">
                            <BiMap className="inline" /><span><small>{item.location.district}, {item.location.city}, {item.location.province}</small></span>
                        </div>
                        <div className="text-xs font-semibold uppercase">
                            {
                                item.type.includes("Campur") &&
                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Campur</span>
                            }
                            {
                                item.type.includes("Putri") &&
                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Putri</span>
                            }
                            {
                                item.type.includes("Putra") &&
                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Putra</span>
                            }
                            {
                                item.type.includes("Pasutri") &&
                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Pasutri</span>
                            }
                            {
                                item.type.includes("LV") &&
                                <span className="rounded-full text-xs inline-block px-1 text-green-700 border mr-1">LV</span>
                            }
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