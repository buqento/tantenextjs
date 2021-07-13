import React, { Component } from 'react'
import { array } from 'prop-types'
import Image from 'next/image'
class GalleryComponent extends Component {
    render() {
        // const { images } = this.props
        const images = ["wSngb9M.webp", "qsJeO5c.webp", "lefXnYU.webp"]
        return (
            <div className="grid grid-cols-2 gap-1">
                <div className="xs:col-span-2 row-span-2 h-96">
                    <Image
                        className="lazyload object-cover object-center w-full h-96"
                        layout="fill"
                        src={`https://cdn.statically.io/img/i.imgur.com/${images[0]}`} />
                </div>
                <div className="block xs:hidden h-48">
                    <Image
                        className="lazyload object-cover object-center w-full h-48"
                        layout="fill"
                        src={`https://cdn.statically.io/img/i.imgur.com/${images[1]}`}
                    />
                </div>
                <div className="block xs:hidden h-48">
                    <Image
                        className="lazyload object-cover object-center w-full h-48"
                        layout="fill"
                        src={`https://cdn.statically.io/img/i.imgur.com/${images[2]}`} />

                </div>
            </div>
        )
    }
}
GalleryComponent.propTypes = {
    images: array
}
GalleryComponent.defaultProps = {
    images: null
}
export default GalleryComponent