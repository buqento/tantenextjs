import React, { Component } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import Link from 'next/link'
import { string } from 'prop-types'

class HeadPage extends Component {
    render() {
        const { title } = this.props;
        return (
            <div className="d-flex p-3">
                <div><Link href="/"><FaChevronLeft /></Link></div>
                <div className="ml-3">{title}</div>
            </div>
        )
    }
}

HeadPage.propTypes = {
    title: string
}

HeadPage.defaultProps = {
    title: 'Detail'
}

export default HeadPage;