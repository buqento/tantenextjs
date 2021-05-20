import React, { Component } from 'react'
import { shape } from 'prop-types'
import { FaWhatsapp } from 'react-icons/fa'
import { BiPhoneCall } from 'react-icons/bi'
import { MdStar, MdStarBorder } from 'react-icons/md'
import ReactGa from 'react-ga'
class FooterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { like: false }
        this.handleCall = this.handleCall.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }
    componentDidMount() {
        const { data } = this.props
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        const findFav = userdataFav.filter(i => i.id === data.id).length
        if (findFav > 0) this.setState({ like: true })
    }
    handleCall(phone) {
        ReactGa.event({
            category: 'Call Button',
            action: phone
        })
        window.open('tel:' + phone);
    }
    handleWa(phone) {
        ReactGa.event({
            category: 'Whatsapp',
            action: 'WA' + phone
        })
    }
    handleFavorite() {
        const { data } = this.props
        this.setState({ like: true })
        let fav = localStorage.getItem('favorites')
        let dataFav
        if (fav === null) { dataFav = [] } else { dataFav = JSON.parse(fav) }
        const findData = dataFav.filter(i => i.id === data.id).length
        const newData = {
            category: data.category,
            date_view: Date.now(),
            facility: { bathroom: data.facility.bathroom, building: data.facility.building, share: data.facility.share, room: data.facility.room },
            id: data.id,
            images: data.images,
            location: {
                city: data.location.city, district: data.location.district, near: data.location.near, province: data.location.province
            },
            name: data.name,
            price: { start_from: data.price.start_from, duration: data.price.duration },
            slug: data.slug,
            title: data.title,
            type: data.type
        }
        if (findData === 0) {
            dataFav.push(newData)
            localStorage.setItem('favorites', JSON.stringify(dataFav))
        }
        this.props.callbackFromParent();
    }
    handleUnfavorite() {
        const { data } = this.props
        this.setState({ like: false })
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        // remove data from array
        userdataFav = userdataFav.filter(function (item) {
            return item.id !== data.id
        })
        localStorage.setItem('favorites', JSON.stringify(userdataFav))
    }
    render() {
        const { data } = this.props;
        const { like } = this.state;
        return (
            <div className="sticky bottom-0 border-bottom bg-white w-100">
                <div className="text-gray-700 text-center self-center flex">
                    <div className="w-100">
                        {
                            like ?
                                <button className="w-100 bg-pink-700 hover:bg-pink-600 text-white font-bold mr-1 py-1 uppercase focus:outline-none" onClick={like ? () => this.handleUnfavorite() : () => this.handleFavorite()}>
                                    <div style={{ textAlign: '-webkit-center' }}>
                                        <MdStar size={22} />
                                    </div>
                                    Simpan
                                    </button>
                                :
                                <button className="w-100 bg-indigo-700 hover:bg-indigo-600 text-white text-center font-bold mr-1 py-1 px-1 uppercase focus:outline-none" onClick={like ? () => this.handleUnfavorite() : () => this.handleFavorite()}>
                                    <div style={{ textAlign: '-webkit-center' }}>
                                        <MdStarBorder size={22} />
                                    </div>
                                Simpan
                            </button>
                        }
                    </div>
                    <div className="w-100">
                        {
                            data.contact_us && data.contact_us.phone !== '' ?
                                <button className="w-100 bg-blue-700 hover:bg-blue-600 text-white font-bold mr-1 py-1 px-1 uppercase focus:outline-none" onClick={() => this.handleCall(data.contact_us.phone)}>
                                    <div style={{ textAlign: '-webkit-center' }}>
                                        <BiPhoneCall size={22} />
                                    </div>
                                Telepon
                                </button>
                                :
                                <button className="w-100 bg-blue-500 text-white font-bold mr-1 py-1 px-3 rounded-full opacity-50 cursor-not-allowed uppercase focus:outline-none">
                                    <div style={{ textAlign: '-webkit-center' }}>
                                        <BiPhoneCall size={22} />
                                    </div>
                            Telepon
                            </button>
                        }
                    </div>
                    <div className="w-100">
                        {
                            data.contact_us && data.contact_us.whatsapp !== undefined ?

                                <a href={`https://wa.me/${data.contact_us.whatsapp}/?text=Hai, saya tertarik dengan kost ini https://tantekos.com/${data.slug}`} target="BLANK">
                                    <button className="w-100 bg-green-400 hover:bg-green-300 text-white font-bold py-1 px-1 uppercase focus:outline-none" onClick={() => this.handleWa(data.contact_us.phone)}>
                                        <div style={{ textAlign: '-webkit-center' }}>
                                            <FaWhatsapp size={22} />
                                        </div>
                                WhatsApp
                                </button>
                                </a>
                                :
                                <button className="w-100 bg-green-300 text-white font-bold py-1 px-1 opacity-50 cursor-not-allowed uppercase focus:outline-none">
                                    <div style={{ textAlign: '-webkit-center' }}>
                                        <FaWhatsapp size={22} />
                                    </div>
                                    WhatsApp
                                    </button>
                        }
                    </div>

                </div>
            </div>
        )
    }
}
FooterDetail.propTypes = {
    data: shape({}),
}
FooterDetail.defaultProps = {
    data: null
}
export default FooterDetail;