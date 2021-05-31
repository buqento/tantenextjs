import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import { MdStar } from 'react-icons/md'
import fire from '../configurations/firebase'
import Facilities from './Facilities'
import moment from 'moment'
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
            <a className="hover:text-current" href={`/${Generateslug(item.title)}`}>
                <div className={`mx-3 my-3 border overflow-hidden ${customStyle}`} onClick={() => handleLastView()}>
                    <div className="flex mx-3 my-3">
                        <div className="">
                            <img className="rounded-full mr-2 h-10 w-10 rounded-full" src={item.user ? item.user.photo_url : `https://lh3.googleusercontent.com/a-/AOh14GjjPCDsfAHebN5lD2lUt2blSJY6jlKDiukkYGkCbw=s96-c`} alt={item.user ? item.user.display_name : `admin`} />
                        </div>
                        <div>
                            {/* <div>{item.user.display_name}</div> */}
                            <div>{item.user ? item.user.display_name : `Admin`}</div>
                            <div>
                                <small className="text-gray-700 uppercase">{moment(item.date_modified).lang('id').fromNow()} &middot; {item.hit} kali dilihat</small>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-400">
                        <img className="object-cover object-center w-full h-64" src={`https://cdn.statically.io/img/i.imgur.com/w=450/${item.images[0]}`} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                    </div>
                    <div className="mx-3 my-3">
                        {/* price and action */}
                        <div className="text-2xl flex">
                            <div className="flex-auto">
                                <span className="font-bold">
                                    {like && <MdStar className="inline text-pink-500 mt-1 mr-1 float-right" />}
                                    {Cash(item.price.start_from, false)}
                                </span>
                                <span className="text-xs text-gray-700">/{item.price.duration}</span>
                            </div>
                            <div className="mt-2 text-sm underline uppercase text-indigo-700">
                                Selengkapnya
                            </div>
                        </div>

                        {/* facilities */}
                        {
                            item.category === 'Kost' ? item.facility.room.length > 0 && <Facilities items={item.facility.room} inline />
                                : <Facilities items={item.facility.building} inline />
                        }

                        {/* location */}
                        <div className="clamp-1">
                            <BiMap size={20} className="inline" /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                        </div>

                        <div className="text-sm">
                            {/* category */}
                            <div className="uppercase mt-2 text-indigo-700">
                                {
                                    item.type.includes("Campur") &&
                                    <span className="inline-block px-1 mr-1">{item.category === 'Kost' ? 'Campur' : 'Kontrakan'}</span>
                                }
                                {
                                    item.type.includes("Putri") &&
                                    <span className="inline-block px-1 mr-1">Putri</span>
                                }
                                {
                                    item.type.includes("Putra") &&
                                    <span className="inline-block px-1 mr-1">Putra</span>
                                }
                                {
                                    item.type.includes("Pasutri") &&
                                    <span className="inline-block px-1 mr-1">Pasutri</span>
                                }
                                {
                                    item.type.includes("LV") &&
                                    <span className="rounded-full inline-block px-1 border mr-1">LV</span>
                                }
                            </div>
                        </div>

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