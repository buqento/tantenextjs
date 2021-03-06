import React, { Component } from 'react'
import { string, arrayOf } from 'prop-types'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Image from 'next/image'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
class Slide extends Component {
    render() {
        const { images } = this.props;
        return <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            // navigation
            autoplay
        >
            {
                images && images.map((item, index) =>
                    <SwiperSlide key={index} className="bg-gray-900">
                        <div className="w-full h-80">
                            <Image
                                loader="/static/images/image-not-found.png"
                                className="object-contain object-center w-full h-80" src={`https://cdn.statically.io/img/i.imgur.com/${item}`} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} layout="fill"
                            />
                        </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    }
}
Slide.propTypes = {
    imageTitle: string,
    images: arrayOf(string)
}
Slide.defaultProps = {
    imageTitle: null,
    images: null
}
export default Slide;