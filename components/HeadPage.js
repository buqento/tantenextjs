import React, { Component } from 'react'
import { BiChevronLeft, BiSearchAlt, BiListUl } from 'react-icons/bi'
import { MdStar } from 'react-icons/md'
import { string, bool } from 'prop-types'
import Router from 'next/router'
class HeadPage extends Component {
    render() {
        const { nohead, page, title, style } = this.props;
        return (
            <div className={`z-10 bg-white pt-3 pr-3 mb-3 text-gray-700 font-bold clamp-1 ${page === 'home' && 'sticky top-0 text-2xl border-bottom'}`}>
                {
                    page !== 'home' &&
                    <span onClick={page === 'detail' ? () => Router.push('/') : () => Router.back()}>
                        <BiChevronLeft size={40} className="inline mb-1 mr-1" />
                    </span>
                }
                {
                    !nohead ? <h1 className="inline">{title}</h1> :
                        <h1 onClick={() => Router.push('/')} className={style}>{title}</h1>
                }
                {
                    page === 'home' &&
                    <>
                        <div className="inline p-1 ml-2 mb-3 border rounded-full float-right">
                            <a href="/search/all"><BiSearchAlt size={24} className="text-indigo-700" /></a>
                        </div>
                        <div className="inline p-1 ml-2 mb-3 border rounded-full float-right">
                            <a href="/history"><BiListUl size={24} className="text-indigo-700" /></a>
                        </div>
                        <div className="inline p-1 mb-2 border rounded-full float-right">
                            <a href="/favorites"><MdStar size={24} className="text-pink-500" /></a>
                        </div>
                    </>
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