import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { shape } from 'prop-types'

class FooterDetail extends Component {
    render() {
        const { contactUs } = this.props;
        return (
            <div className="fix-footer footer-detail d-flex p-1 w-100">
                <div className="w-50 m-1">
                    {
                        contactUs && contactUs.facebook_url !== '' ? <Button variant="primary" href={contactUs.facebook_url} target="_blank" className="w-100">Facebook</Button> : <Button variant="secondary" disabled className="w-100">Facebook</Button>
                    }
                </div>
                <div className="w-50 m-1">
                    {
                        contactUs && contactUs.phone !== '' ? <Button variant="success" href={`https://wa.me/${contactUs.phone}`} target="_blank" className="w-100">WhatsApp</Button> : <Button variant="secondary" disabled className="w-100">WhatsApp</Button>
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