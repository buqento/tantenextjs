import React from 'react'
import NavBar from './NavBar';
import Footer from '../components/Footer'

const Layout = (props) => (
    <>
        <NavBar />
        <div>
            {props.children}
        </div>
        <Footer />
    </>
)

export default Layout;