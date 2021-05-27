import React from 'react'
import Link from 'next/link'
import { auth, firebase } from '../configurations/auth'
import { Container } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import router from 'next/router'
import SocialLogin from 'react-social-login'
import SocialButton from '../components/SocialButton'

class Sociallogin extends React.Component {
  componentDidMount(user){
    console.log('u:',user);
  }
  handleSignIn = (user) => {
    console.log(user);
  }
  handleSocialLoginFailure = (err) => {
    console.error(err)
  }
  render() {
    const { children, triggerLogin, ...props } = this.props
    return (
      <Container className="text-center my-5">
        <div className="text-4xl">Login</div>

        <div>

          <SocialButton
            provider="google"
            appId="788082975831-u359tstdmbm4g6b8evnkafvige96cbv9.apps.googleusercontent.com"
            onLoginSuccess={this.handleSignIn}
            onLoginFailure={this.handleSocialLoginFailure}
            autoLogin={true}
          >
            <button>Login with Google</button>

          </SocialButton>
        </div>
        <SocialButton
          provider="facebook"
          appId="3234331779955939"
          onLoginSuccess={this.handleSignIn}
          onLoginFailure={this.handleSocialLoginFailure}
        >
          <button>Login with Facebook</button>

        </SocialButton>



        <div>
          <a href="googlechrome://www.tantekos.com/login">www.tantekos.com</a>
        </div>
        <div>
          <a href="googlechrome://tantekos.com/login">tantekos.com</a>
        </div>
        {/* <div className="my-5 p-2 text-center border cursor-pointer" onClick={this.handleSignIn}><FcGoogle className="inline mb-1 mr-2" />Login dengan Google</div> */}
        <div>Kami tidak akan membagikan detail pribadi Anda dengan siapa pun. Jika Anda login, Anda menerima Syarat dan Ketentuan serta <Link href="policy"><span className="underline cursor-pointer">Kebijakan Privasi</span></Link></div>
        <div className="mt-5 underline"><Link href="/">Kembali ke Beranda</Link></div>
      </Container>
    )
  }
}
export default Sociallogin