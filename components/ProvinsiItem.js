import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Badge } from 'react-bootstrap'
import Generatelink from '../utils/Generatelink'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={`area/provinsi/${Generatelink(item.title)}`}>
                    <Badge pill variant="secondary" className="mr-3 pt-2 pl-3 pr-3">
                        <h5>{item.title}</h5>
                    </Badge>
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