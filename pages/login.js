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
        router.push('addnew')
      })
      .catch(err => {
        alert('OOps something went wrong check your console');
        console.log(err);
      });
  }
  // handleLogout = () => {
  //   auth.signOut().then(function () {
  //     router.push('/')
  //   }).catch(function (error) {
  //     alert('OOps something went wrong check your console');
  //     console.log(err);
  //   });
  // }
  render() {
    return (
      <Container className="text-center my-5">
        <div className="text-4xl">Login</div>
        <div>
          Untuk menggunakan layanan ini silahkan masuk dengan akun Google Anda.
        </div>
        <div className="my-5 p-2 text-center border cursor-pointer" onClick={this.handleSignIn}><FcGoogle className="inline mb-1 mr-2" />Masuk dengan Google</div>
        <Link href="/">Kembali ke Beranda</Link>
      </Container>
    )
  }
}
export default Login