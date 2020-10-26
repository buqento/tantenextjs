import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

class Area extends Component {
    render() {
        return (
            <div className="mt-3 mb-3">
                <ListGroup variant="flush">
                    <ListGroup.Item action href="https://www.facebook.com/groups/tantekos" target="blank">Informasi Rumah/Kos/Kontrakan Wilayah Maluku</ListGroup.Item>
                    <ListGroup.Item action href="https://www.facebook.com/groups/811913479639737" target="blank">Informasi Rumah/Kos/Kontrakan Wilayah Papua</ListGroup.Item>
                </ListGroup>
            </div>
        )
    }
}

export default Area