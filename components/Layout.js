import React from 'react'
import Footer from '../components/Footer'
import HeadPage from '../components/HeadPage'
import NavBar from "./NavBar";
import navButtons from "./Buttons";
const Layout = (props) => (
    <div className="main-layout mb-5 pb-1">
        { props.withHeader && <HeadPage nohead page="home" title={props.title} style="text-indigo-700 inline pl-3" />}
        <div>{props.children}</div>
        { props.withFooter && <Footer />}
        <NavBar navButtons={navButtons} />
    </div>
)
export default Layout;