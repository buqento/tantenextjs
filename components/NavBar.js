import React from 'react'
import { Navbar } from 'react-bootstrap';

const NavBar = () => (
    <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className="font-bold"><span className="text-gray-700">Tantekos</span></Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            {/* <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="about">Tentang Kami</Nav.Link>
                    <Nav.Link href="contact">Kontak Kami</Nav.Link>
                    <Nav.Link href="policy">Kebijakan Privasi</Nav.Link>
                </Nav>
            </Navbar.Collapse> */}
        </Navbar>
    </>
)

export default NavBar;