import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={`area/provinsi/${Generateslug(item.title)}`}>
                <button className="whitespace-no-wrap bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-indigo-400 py-2 px-3 border border-indigo-500 hover:border-transparent rounded mr-2">
                    {item.title}
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