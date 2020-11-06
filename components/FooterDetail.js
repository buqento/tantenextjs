import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { shape, string } from 'prop-types'
import { FaFacebook, FaPhoneSquareAlt } from 'react-icons/fa';
import ReactGa from 'react-ga'

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
        const { contactUs, title } = this.props;
        return (
            <div className="sticky bottom-0 bg-gray-100 d-flex p-1 w-100">
                <div className="w-50 m-1">
                    {
                        contactUs && contactUs.facebook_url !== '' ? <Button variant="primary" onClick={() => this.handleFacebook(title)} href={contactUs.facebook_url} target="_blank" className="w-100"><FaFacebook size={20} className="mr-2 inline" />Facebook</Button> : <Button variant="secondary" disabled className="w-100"><FaFacebook size={20} className="mr-2 inline" />Facebook</Button>
                    }
                </div>
                <div className="w-50 m-1">
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
    title: string
}

FooterDetail.defaultProps = {
    contactUs: null,
    title: null
}

export default FooterDetail;