import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { Badge } from 'react-bootstrap'
import Currency from './Currency'
import Link from 'next/link'

class CategoryPrice extends Component {
    render() {
        const prices = [500000, 750000, 1000000, 1250000, 1500000, 2000000]
        return (
            <div className="mt-3 mb-3 pb-3" style={{ borderBottom: '8px solid #f5f5f5' }}>
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {prices.sort(function (a, b) { return a - b; })
                            .map((item, index) =>
                                <div key={index}>
                                    <Link href={`search/price/${item}`}>
                                        <Badge pill variant="secondary" className="mr-3 pt-2 pl-3 pr-3">
                                            <h5>{`${Currency(item)}<`}</h5>
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