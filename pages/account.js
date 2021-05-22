import React from 'react'
import fire from '../configurations/firebase'
import { auth, firebase } from '../configurations/auth'
import Layout from '../components/Layout'
import withAuth from '../helpers/withAuth';
import { Container } from 'react-bootstrap';
import { FaList } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import router from 'next/router'
import Link from 'next/link';

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
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
        return <Layout title="Akun Saya" withHeader>
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
        </Layout>
    }
}
export default withAuth(Account);
