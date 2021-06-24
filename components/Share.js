import React from 'react'
import { FacebookShareButton, WhatsappShareButton, WhatsappIcon, FacebookIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon } from "react-share"
import { shape } from 'prop-types'
class Share extends React.Component {
    render() {
        const { detail } = this.props;
        return (
            <div>
                <FacebookShareButton quote={detail.description} url={`https://tantekos.com/${detail.slug}`}><FacebookIcon size="2rem" /></FacebookShareButton>
                <TwitterShareButton title={detail.description} url={`https://tantekos.com/${detail.slug}`}><TwitterIcon size="2rem" /></TwitterShareButton>
                <WhatsappShareButton title={detail.description} url={`https://tantekos.com/${detail.slug}`}><WhatsappIcon size="2rem" /></WhatsappShareButton>
                <TelegramShareButton title={detail.description} url={`https://tantekos.com/${detail.slug}`}><TelegramIcon size="2rem" /></TelegramShareButton>
            </div>
        )
    }
}
Share.propTypes = {
    detail: shape({})
}
Share.defaultProps = {
    detail: null
}
export default Share