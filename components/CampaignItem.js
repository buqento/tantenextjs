import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import { MdFavorite } from 'react-icons/md'
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
    render() {
        const { like } = this.state;
        const { item, customStyle } = this.props
        const handleLastView = (item) => {
            let lastView = localStorage.getItem('lastview')
            let data
            if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
            const findData = data.filter(i => i.id === item.id).length
            if (data.length > 5) { data.shift() }
            if (findData === 0) {
                data.push(item)
                localStorage.setItem('lastview', JSON.stringify(data))
            }
        }
        return (
            <Link href={`/${Generateslug(item.title)}`}>
                <div className={`rounded-xl overflow-hidden border ${customStyle}`} onClick={() => handleLastView(item)}>
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} style={{ maxWidth: 'unset' }} />
                    <div className="px-2 pt-2 pb-2 text-center">
                        <div className="px-2 text-xl">
                            <span className="font-bold">
                                {like && <MdFavorite className="inline text-pink-500 mb-1 mr-1" />}
                                {Cash(item.price.start_from, false)}
                            </span>
                            <span className="text-xs text-gray-700">/{item.price.duration}</span>
                        </div>
                        <div className="text-current leading-none clamp-1">
                            <BiMap className="inline mr-1" /><span><small>{item.location.district}, {item.location.province}</small></span>
                        </div>
                        <div>
                            {
                                item.facility.room.includes("AC") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">AC</span>
                            }
                            {
                                item.facility.room.includes("Wifi") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">WiFi</span>
                            }
                            {
                                item.facility.room.includes("Kamar Mandi Dalam") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border">KM. Dalam</span>
                            }
                        </div>
                        <div className="border-top pt-2 mt-2">
                            {
                                item.type.includes("Campur") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-blue-700 border mr-1 uppercase">Campur</span>
                            }
                            {
                                item.type.includes("Putri") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-blue-700 border mr-1 uppercase">Putri</span>
                            }
                            {
                                item.type.includes("Putra") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-blue-700 border mr-1 uppercase">Putra</span>
                            }
                            {
                                item.type.includes("Pasutri") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-blue-700 border mr-1 uppercase">Pasutri</span>
                            }
                            {
                                item.type.includes("LV") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-blue-700 border mr-1 uppercase">LV</span>
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