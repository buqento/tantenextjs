import React from 'react'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import router from 'next/router'
import SocialButton from '../components/SocialButton'
import UserCard from './userCard'

class Sociallogin extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node
    }
  }

  onLoginSuccess(user) {
    console.log(user)

    this.setState({
      logged: true,
      currentProvider: user._provider,
      user
    })
  }

  onLoginFailure(err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess() {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure(err) {
    console.error(err)
  }

  logout() {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render() {
    const { user, logged, currentProvider } = this.state
    console.log('logged=======>', logged);
    console.log('user=======>', user);
    console.log('currentProvider=======>', currentProvider);
    return (
      <Container className="text-center my-5">
        <div className="text-4xl">Login</div>

        <div>
          <SocialButton
            provider="facebook"
            appId="3234331779955939"
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'facebook')}
            key={'facebook'}
            onInternetFailure={() => { return true }}
            autoLogin={true}
          >
            <button>Login dengan Facebook</button>
          </SocialButton>
        </div>

        <UserCard user={user} />

        {/* <div className="my-5 p-2 text-center border cursor-pointer" onClick={this.handleSignIn}><FcGoogle className="inline mb-1 mr-2" />Login dengan Google</div> */}

        <div>Kami tidak akan membagikan detail pribadi Anda dengan siapa pun. Jika Anda login, Anda menerima Syarat dan Ketentuan serta <Link href="policy"><span className="underline cursor-pointer">Kebijakan Privasi</span></Link></div>
        <div className="mt-5 underline"><Link href="/">Kembali ke Beranda</Link></div>

        {/* <Container className="divide-y-2 divide">
          <div className="flex py-3">
            <div><img src={user.photoURL} alt={userdata.displayName} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} /></div>
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
        </Container> */}

      </Container>
    )
  }
}
export default Sociallogin