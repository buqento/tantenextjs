import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
    <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className="font-weight-bold">Tantekos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="faq">FAQ</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
)

export default NavBar;