import React, { Component } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { string, bool } from 'prop-types'
import Router from 'next/router'
class HeadPage extends Component {
    render() {
        const { homepage, title } = this.props;
        return (
            <div className={`flex p-3 text-gray-700 font-bold ${homepage && 'bg-gray-100 text-2xl'}`}>
                {
                    !homepage && <div className="mr-3" onClick={() => Router.back()}><AiOutlineArrowLeft size={24} /></div>
                }
                <div>{title}</div>
            </div>
        )
    }
}
HeadPage.propTypes = {
    homepage: bool,
    title: string
}
HeadPage.defaultProps = {
    homepage: false,
    title: 'Detail'
}
export default HeadPage;