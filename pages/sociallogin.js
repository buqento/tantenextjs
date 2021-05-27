import React from 'react'
import Link from 'next/link'
import { auth, firebase } from '../configurations/auth'
import { Container } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import router from 'next/router'
import SocialLogin from 'react-social-login'
import SocialButton from '../components/SocialButton'
import SocialLogin from 'react-social-login'

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

        {/* <div className="my-5 p-2 text-center border cursor-pointer" onClick={this.handleSignIn}><FcGoogle className="inline mb-1 mr-2" />Login dengan Google</div> */}

        <div>Kami tidak akan membagikan detail pribadi Anda dengan siapa pun. Jika Anda login, Anda menerima Syarat dan Ketentuan serta <Link href="policy"><span className="underline cursor-pointer">Kebijakan Privasi</span></Link></div>
        <div className="mt-5 underline"><Link href="/">Kembali ke Beranda</Link></div>
      </Container>
    )
  }
}
export default Sociallogin