import React from 'react'
import { Container } from 'react-bootstrap'
import { FaList } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import router from 'next/router'
import Link from 'next/link';
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import SocialButton from '../components/SocialButton'
class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
            user: {},
            data: []
        }
        this.nodes = {}

        this.onLoginSuccess = this.onLoginSuccess.bind(this)
        this.onLoginFailure = this.onLoginFailure.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }
    setNodeRef(provider, node) {
        if (node) {
            this.nodes[provider] = node
        }
    }
    onLoginSuccess(user) {
        console.log(user);
        this.setState({ logged: true, user })
    }

    onLoginFailure(err) {
        console.log(err);
        router.push('/login')
    }
    handleLogout() {
        const { logged, currentProvider } = this.state
        if (logged && currentProvider) {
            this.nodes[currentProvider].props.triggerLogout()
            router.push('/')
        }
    }
    render() {
        const { user, logged } = this.state
        return <>
            <NavComponent />
            <SocialButton
                provider="facebook"
                appId="3234331779955939"
                onLoginSuccess={this.onLoginSuccess}
                onLoginFailure={this.onLoginFailure}
                key={'facebook'}
                onInternetFailure={() => { return true }}
                autoLogin={true}
            ></SocialButton>
            {
                logged && user._profile &&
                <Container className="divide-y-2 divide">
                    <div className="flex py-3">
                        <div><img src={user._profile.profilePicURL} alt={user._profile.name} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} /></div>
                        <div className="ml-2">
                            <div>Hallo,</div>
                            <div className="text-lg font-bold">{user._profile.name}</div>
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
            }
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </>
    }
}
export default Account;
