import React, { Component } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { string, bool } from 'prop-types'
import Router from 'next/router'
class HeadPage extends Component {
    render() {
        const { nohead, page, title, style } = this.props;
        return (
            <div className={`flex p-2 text-gray-700 font-bold ${page === 'home' && 'text-2xl'}`}>
                {
                    page !== 'home' &&
                    <div className="mr-3" onClick={page === 'detail' ? () => Router.push('/') : () => Router.back()}>
                        <BiChevronLeft size={40} />
                    </div>
                }
                {
                    !nohead ? <div className="self-center">{title}</div> : <h1 className={style}>{title}</h1>
                }
            </div>
        )
    }
}
HeadPage.propTypes = {
    page: string,
    nohead: bool,
    title: string,
    style: string
}
HeadPage.defaultProps = {
    page: null,
    nohead: false,
    title: null,
    style: null
}
export default HeadPage;