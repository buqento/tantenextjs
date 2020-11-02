import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { DtProvinsi } from '../utils/modals/Provinsi'
import ProvinsiItem from './ProvinsiItem'

class Area extends Component {
    render() {
        return (
            <div className="mt-3 mb-3">
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {
                            DtProvinsi
                                .slice(0, 10)
                                .map((item, index) => <ProvinsiItem item={item} key={index} />)
                        }
                    </div>
                </DragScroll>
            </div>
        )
    }
}

export default Area