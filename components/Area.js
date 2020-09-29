import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { DataArea } from '../utils/modals/fakeDb'
import AreaItem from './AreaItem'

class Area extends Component {
    render() {
        return (
            <div className="mt-3 mb-3">
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {DataArea.map((item, index) => <AreaItem item={item} key={index} />)}
                    </div>
                </DragScroll>
            </div>
        )
    }
}

export default Area