import React from 'react'
import Footer from '../components/Footer'
import HeadPage from '../components/HeadPage'
const Layout = (props) => (
    <div className="main-layout">
        <HeadPage homepage title="Tantekos" />
        <div>
            {props.children}
        </div>
        <Footer />
    </div>
)
export default Layout;