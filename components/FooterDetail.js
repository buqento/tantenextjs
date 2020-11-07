import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { shape } from 'prop-types'
import { FaPhoneSquareAlt } from 'react-icons/fa';
import ReactGa from 'react-ga'
import Currency from '../components/Currency'

class FooterDetail extends Component {
    constructor(props) {
        super(props);
        this.handleCall = this.handleCall.bind(this);
        this.handleFacebook = this.handleFacebook.bind(this);
    }
    handleCall(phone) {
        ReactGa.event({
            category: 'Call Button',
            action: phone
        })
        window.open('tel:' + phone);
    }
    handleFacebook(title) {
        ReactGa.event({
            category: 'Facebook Button',
            action: title
        })
    }
    render() {
        const { data } = this.props;
        return (
            <div className="sticky flex bottom-0 bg-gray-200 p-1 w-100">
                <div className="flex-auto pl-2 pr-4">
                    <div className="text-xs text-gray-700">Harga {data.category} Mulai</div>
                    <div className="text-xl font-bold">{Currency(data.start_price)}</div>
                </div>
                <div className="mr-2 text-gray-700 text-center self-center">
                    {
                        data.contact_us && data.contact_us.phone !== '' ? <Button variant="success" onClick={() => this.handleCall(data.contact_us.phone)}><FaPhoneSquareAlt size={20} className="mr-2 inline" />Telepon</Button> : <Button variant="secondary" disabled><FaPhoneSquareAlt size={20} className="mr-2 inline" />Telepon</Button>
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