import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { Button, Badge } from 'react-bootstrap'
import { DataArea, DataKos } from '../utils/modals/fakeDb'

class Area extends Component {
    
    constructor(){
        super()
        this.count = this.count.bind(this)
    }
        
    count(location){
        return DataKos.filter(item => location === item.location_title).length
    }

    render() {
        return (
            <div className="mt-3 mb-3">
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {
                            DataArea.map((item, index) =>
                        <Button key={index} href={`area/${item.slug}`} variant="secondary" className="mr-3 text-nowrap" size="sm">{item.title} <Badge variant="danger">{this.count(item.slug)}</Badge></Button>
                            )
                        }
                    </div>
                </DragScroll>
            </div>
        )
    }
}

export default Area