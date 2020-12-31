import React, { Component } from 'react'
import { shape } from 'prop-types'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import ReactGa from 'react-ga'
import Cash from '../utils/Cash'
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
    handleFavorite() {
        const { data } = this.props;
        this.setState({ like: true })
        let fav = localStorage.getItem('favorites')
        let dataFav
        if (fav === null) { dataFav = [] } else { dataFav = JSON.parse(fav) }
        const findData = dataFav.filter(i => i.id === data.id).length
        if (findData === 0) {
            dataFav.push(data)
            localStorage.setItem('favorites', JSON.stringify(dataFav))
        }
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
            <div className="sticky flex bottom-0 border-top bg-gray-100 p-1 w-100">
                <div className="flex-auto pl-2 pr-4">
                    <div className="text-xs text-gray-700">Harga {data.category} Mulai</div>
                    <div>
                        <span className="text-2xl font-bold">{Cash(data.price.start_from)}</span>
                        <span className="text-xs text-gray-700">/{data.price.duration}</span>
                    </div>
                </div>
                <div className="mr-2 text-gray-700 text-center self-center">
                    <MdFavorite className={`${like ? 'text-pink-500' : 'text-gray-400'} border rounded mr-2 mb-1 inline`} size={40} onClick={like ? () => this.handleUnfavorite() : () => this.handleFavorite()} />
                    {
                        data.contact_us && data.contact_us.phone !== '' ? <button className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-2 rounded uppercase focus:outline-none" onClick={() => this.handleCall(data.contact_us.phone)}><FaPhoneAlt className="mr-2 inline" />Telepon</button> : <button className="bg-indigo-500 text-white font-bold py-2 px-2 rounded opacity-50 cursor-not-allowed uppercase focus:outline-none"><FaPhoneAlt className="mr-2 inline" />Telepon</button>
                    }
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