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
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay
        >
            {
                imagesData && imagesData.map((item, index) =>
                    <SwiperSlide key={index}>
                        <img 
                        width="414px"
                        src={`https://cdn.statically.io/img/i.imgur.com/w=414/${item}`}
                        alt={`${imageTitle} 
                        ${index+1}`} 
                        style={{maxHeight: '414px'}} />
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


