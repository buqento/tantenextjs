import React, { Component } from 'react'
import { string, arrayOf } from 'prop-types'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
class Slide extends Component {
    render() {
        const { imagesData, imageTitle } = this.props;
        return <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            // navigation
            autoplay
        >
            {
                imagesData && imagesData.map((item, index) =>
                    <SwiperSlide key={index} className="text-left">
                        {/*1, 2, 4, 16, 20, 24, 32, 40 48, 56, 64 */}
                        <img className="object-cover object-center w-full h-64 lg:h-screen" src={`https://cdn.statically.io/img/i.imgur.com/${item}`} alt={`${imageTitle}${index + 1}`} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                    </SwiperSlide>
                )
            }
        </Swiper>
    }
}
Slide.propTypes = {
    imageTitle: string,
    imagesData: arrayOf(string)
}
Slide.defaultProps = {
    imageTitle: null,
    imagesData: null
}
export default Slide;