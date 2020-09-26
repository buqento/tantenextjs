import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { shape } from 'prop-types'
import { FaFacebook, FaPhoneSquareAlt } from 'react-icons/fa';

class FooterDetail extends Component {

    constructor(props) {
        super(props);
        this.handlecall = this.handlecall.bind(this);
    }

    handlecall(phone) {
        window.open('tel:' + phone);
    }

    render() {
        const { contactUs } = this.props;
        return (
            <div className="main-layout fix-footer footer-detail d-flex p-1 w-100">
                <div className="w-50 m-1">
                    {
                        contactUs && contactUs.facebook_url !== '' ? <Button variant="primary" href={contactUs.facebook_url} target="_blank" className="w-100"><FaFacebook size={20} className="mr-2" />Facebook</Button> : <Button variant="secondary" disabled className="w-100"><FaFacebook size={20} className="mr-2" />Facebook</Button>
                    }
                </div>
                <div className="w-50 m-1">
                    {
                        contactUs && contactUs.phone !== '' ? <Button variant="success" onClick={() => this.handlecall(contactUs.phone)} className="w-100"><FaPhoneSquareAlt size={20} className="mr-2" />Telepon</Button> : <Button variant="secondary" disabled className="w-100"><FaPhoneSquareAlt size={20} className="mr-2" />Telepon</Button>
                    }
                </div>
            </div>
        )
    }
}

FooterDetail.propTypes = {
    contactUs: shape({})
}

FooterDetail.defaultProps = {
    contactUs: null
}

export default FooterDetail;