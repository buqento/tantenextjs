import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { Button } from 'react-bootstrap'
import { DataArea } from '../utils/modals/fakeDb'

class Area extends Component {
    render() {
        return (
            <div className="mt-3 mb-3">
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {
                            DataArea.map((item, index) =>
                                <Button key={index} href={`area/${item.slug}`} variant="primary" className="mr-3 text-nowrap" size="lg">{item.title}</Button>
                            )
                        }
                    </div>
                </DragScroll>
            </div>
        )
    }
}

export default Area