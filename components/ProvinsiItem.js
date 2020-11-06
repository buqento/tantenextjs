import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import Generatelink from '../utils/Generatelink'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={`area/provinsi/${Generatelink(item.title)}`}>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mr-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    <h5>{item.title}</h5>
                </button>
            </Link>
        )
    }
}
AreaItem.propTypes = {
    item: shape({})
}
AreaItem.defaultProps = {
    item: null
}
export default AreaItem;