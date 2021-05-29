import React from 'react'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { FaFacebookSquare } from 'react-icons/fa'
import SocialButton from '../components/SocialButton'
class Login extends React.Component {
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
    this.handleLogout = this.handleLogout.bind(this)
  }
  setNodeRef(provider, node) {
    if (node) { this.nodes[provider] = node }
  }
  onLoginSuccess(user) {
    this.setState({ logged: true, currentProvider: user._provider, user })
  }
  onLoginFailure(err) {
    this.setState({ logged: false, currentProvider: '', user: null })
  }
  onLogoutSuccess() {
    this.setState({ logged: false, currentProvider: '', user: null })
  }
  onLogoutFailure(err) {
    console.error(err)
  }
  handleLogout() {
    const { logged, currentProvider } = this.state
    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }
  render() {
    const { logged } = this.state
    return (
      <Container className="text-center my-5">
        <div className="text-4xl">Login</div>
        <div className="my-5 mx-5 py-3 text-center font-bold border cursor-pointer bg-blue-700 text-white">
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
            {!logged && <><FaFacebookSquare className="inline mb-1 mr-2" />Login dengan facebook</>}
          </SocialButton>
        </div>
        <div>Kami tidak akan membagikan detail pribadi Anda dengan siapa pun. Jika Anda login, Anda menerima Syarat dan Ketentuan serta <Link href="policy"><span className="underline cursor-pointer">Kebijakan Privasi</span></Link></div>
        <div className="mt-5 underline"><Link href="/">Kembali ke Beranda</Link></div>
      </Container>
    )
  }
}
export default Login