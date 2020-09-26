import React from 'react'
import NavBar from './NavBar';
import Footer from '../components/Footer'

const Layout = (props) => (
    <div className="main-layout">
        <NavBar />
        <div>
            {props.children}
        </div>
        <Footer />
    </div>
)

export default Layout;