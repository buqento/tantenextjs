import React, { Component } from 'react'
import { shape } from 'prop-types'
import { FaPhoneAlt } from 'react-icons/fa';
import ReactGa from 'react-ga'
import Currency from '../components/Currency'

class FooterDetail extends Component {
    constructor(props) {
        super(props);
        this.handleCall = this.handleCall.bind(this);
    }
    handleCall(phone) {
        ReactGa.event({
            category: 'Call Button',
            action: phone
        })
        window.open('tel:' + phone);
    }
    render() {
        const { data } = this.props;
        return (
            <div className="sticky flex bottom-0 bg-gray-100 p-1 w-100">
                <div className="flex-auto pl-2 pr-4">
                    <div className="text-xs text-gray-700">Harga {data.category} Mulai</div>
                    <div>
                        <span className="text-2xl font-bold">{Currency(data.price.start_from)}</span>
                        <span className="text-xs text-gray-700">/{data.price.duration}</span>
                    </div>
                </div>
                <div className="mr-2 text-gray-700 text-center self-center">
                    {
                        data.contact_us && data.contact_us.phone !== '' ? <button className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded uppercase" onClick={() => this.handleCall(data.contact_us.phone)}><FaPhoneAlt className="mr-2 inline" />Telepon</button> : <button className="bg-indigo-500 text-white font-bold py-2 px-3 rounded opacity-50 cursor-not-allowed"><FaPhoneAlt className="mr-2 inline" />Telepon</button>
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