import React, { Component } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { string } from 'prop-types'
import Router from 'next/router'
class HeadPage extends Component {
    render() {
        const { page, title } = this.props;
        return (
            <div className={`flex p-3 text-gray-700 font-bold ${page === 'home' && 'bg-gray-100 text-2xl'}`}>
                {
                    page !== 'home' &&
                    <div className="mr-3" onClick={page === 'detail' ? () => Router.push('/') : () => Router.back()}>
                        <AiOutlineArrowLeft size={24} />
                    </div>
                }
                <div>{title}</div>
            </div>
        )
    }
}
HeadPage.propTypes = {
    page: string,
    title: string
}
HeadPage.defaultProps = {
    page: null,
    title: 'Detail'
}
export default HeadPage;