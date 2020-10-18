import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { Badge } from 'react-bootstrap'
import Currency from './Currency'
import Link from 'next/link'
import { Price } from '../utils/modals/Price'

class CategoryPrice extends Component {
    render() {
        return (
            <div className="mt-3 mb-3 pb-3" style={{ borderBottom: '8px solid #f5f5f5' }}>
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {Price.sort(function (a, b) { return a - b; })
                            .map((item, index) =>
                                <div key={index}>
                                    <Link href={`search/price/${item.max_price}`}>
                                        <Badge pill variant="secondary" className="mr-3 pt-2 pl-3 pr-3">
                                            <h5>{Currency(item.max_price)}</h5>
                                        </Badge>
                                    </Link>
                                </div>
                            )}
                    </div>
                </DragScroll>
            </div>
        )
    }
}

export default CategoryPrice