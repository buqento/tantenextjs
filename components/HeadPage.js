import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';

class HeadPage extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Home</Navbar.Brand>
            </Navbar>
        )
    }
}

export default HeadPage;