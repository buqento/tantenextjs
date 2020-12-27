import React from 'react'
import Footer from '../components/Footer'
import HeadPage from '../components/HeadPage'
const Layout = (props) => (
    <div className="main-layout">
        <HeadPage nohead page="home" title="Tantekos" style="text-gray-700 inline pl-3" />
        <div>
            {props.children}
        </div>
        <Footer />
    </div>
)
export default Layout;