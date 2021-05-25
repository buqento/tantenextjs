import React from 'react'
import { auth } from '../configurations/auth'
import withAuth from '../helpers/withAuth'
import { Container } from 'react-bootstrap'
import { FaList } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import router from 'next/router'
import Link from 'next/link';
import Footer from '../components/Footer'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    handleLogout = () => {
        auth.signOut().then(function () {
            router.push('/')
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const { userdata } = this.props
        return <>
            <NavComponent />
            <Container className="divide-y-2 divide">
                <div className="flex py-3">
                    <div><img src={userdata.photoURL} alt={userdata.displayName} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} /></div>
                    <div className="ml-2">
                        <div>Hallo,</div>
                        <div className="text-lg font-bold">{userdata.displayName}</div>
                    </div>
                </div>
                <Link href="iklansaya">
                    <div className="py-3 cursor-pointer">
                        <FaList className="inline mb-1 mr-1" /> Iklan Saya
                </div>
                </Link>
                <div className="py-3 cursor-pointer" onClick={this.handleLogout}>
                    <FiLogOut className="inline mb-1 mr-1" /> Logout
                </div>
            </Container>
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </>
    }
}
export default withAuth(Account);
