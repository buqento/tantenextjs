import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { shape, string, int } from 'prop-types'
import { FaFacebook, FaPhoneSquareAlt } from 'react-icons/fa';
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
        const { contactUs, title, startPrice } = this.props;
        return (
            <div className="sticky flex bottom-0 bg-gray-200 p-1 w-100">
                <div className="flex-auto pl-2 pr-4">
                    <div className="text-xs text-gray-700">Harga Mulai</div>
                    <div className="text-xl font-bold">{Currency(startPrice)}</div>
                </div>
                {/* <div className="flex-auto text-gray-700 text-center px-4">
                    {
                        contactUs && contactUs.facebook_url !== '' ? <Button variant="primary" onClick={() => this.handleFacebook(title)} href={contactUs.facebook_url} target="_blank" className="w-100"><FaFacebook size={20} className="mr-2 inline" />Facebook</Button> : <Button variant="secondary" disabled className="w-100"><FaFacebook size={20} className="mr-2 inline" /></Button>
                    }
                </div> */}
                <div className="flex-initial mx-2 text-gray-700 text-center" style={{alignSelf:'center'}}>
                    {
                        contactUs && contactUs.phone !== '' ? <Button variant="success" onClick={() => this.handleCall(contactUs.phone)} className="w-100"><FaPhoneSquareAlt size={20} className="mr-2 inline" />Telepon</Button> : <Button variant="secondary" disabled className="w-100"><FaPhoneSquareAlt size={20} className="mr-2 inline" />Telepon</Button>
                    }
                </div>
            </div>
        )
    }
}

FooterDetail.propTypes = {
    contactUs: shape({}),
    title: string,
    startPrice: int
}

FooterDetail.defaultProps = {
    contactUs: null,
    title: null,
    startPrice: null
}

export default FooterDetail;