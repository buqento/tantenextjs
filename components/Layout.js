import React from 'react'
import Footer from '../components/Footer'
import HeadPage from '../components/HeadPage'
const Layout = (props) => (
    <div className="main-layout">
        <HeadPage nohead page="home" title="Tantekos" style="text-indigo-700 inline pl-3" />
        <div>
            {props.children}
        </div>
        { props.withFooter && <Footer />}
    </div>
)
export default Layout;