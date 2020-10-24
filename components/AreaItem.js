import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card } from 'react-bootstrap'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={`area/${item.slug}`}>
                <Card bg="light" style={{ width: '140px' }} className="mr-3 pb-2">
                    <div className="pt-2 pr-1 pl-1 text-center clamp1">{item.title}</div>
                    <div className="pr-1 pl-1 text-center text-uppercase clamp1 text-secondary">
                        <small>{item.province}</small>
                    </div>
                </Card>
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