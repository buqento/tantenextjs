import React from 'react'
import Link from 'next/link'
import { auth, firebase } from '../configurations/auth'
import { Container } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import router from 'next/router'
class Login extends React.Component {
  handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.signInWithPopup(provider)
      .then(() => {
        router.push('account')
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Container className="text-center my-5">
        <div className="text-4xl">Login</div>
        <div className="my-5 p-2 text-center border cursor-pointer" onClick={this.handleSignIn}><FcGoogle className="inline mb-1 mr-2" />Login dengan Google</div>
        <div>Kami tidak akan membagikan detail pribadi Anda dengan siapa pun. Jika Anda login, Anda menerima Syarat dan Ketentuan serta <Link href="policy"><span  className="underline cursor-pointer">Kebijakan Privasi</span></Link></div>
        <div className="mt-5 underline"><Link href="/">Kembali ke Beranda</Link></div>
      </Container>
    )
  }
}
export default Login