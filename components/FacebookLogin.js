import React from 'react'
import SocialButton from './SocialButton'

export default function FacebookLogin() {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     logged: false,
  //     user: {},
  //     currentProvider: ''
  //   }
  //   this.nodes = {}
  //   this.onLoginSuccess = this.onLoginSuccess.bind(this)
  //   this.onLoginFailure = this.onLoginFailure.bind(this)
  //   this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
  //   this.onLogoutFailure = this.onLogoutFailure.bind(this)
  //   this.handleLogout = this.handleLogout.bind(this)
  // }

  const [user, setUser] = useState({})
  const [logged, setLogged] = useState(false)


  // const setNodeRef = (provider, node) => {
  //   if (node) {
  //     this.nodes[provider] = node
  //   }
  // }

  const onLoginSuccess = (user) => {
    console.log(user);
    setUser(user)
    setLogged(true)
  }

  const onLoginFailure = (err) => {
    console.error(err)
    setUser({})
    setLogged(false)
  }

  // const onLogoutSuccess = () => {
  //   setUser({})
  //   setLogged(false)
  // }

  // const onLogoutFailure = (err) => {
  //   console.error(err)
  // }

  // const handleLogout = () => {
  //   const { logged, currentProvider } = this.state
  //   if (logged && currentProvider) {
  //     this.nodes[currentProvider].props.triggerLogout()
  //   }
  // }

  return <SocialButton
    provider="facebook"
    appId="3234331779955939"
    onLoginSuccess={onLoginSuccess}
    onLoginFailure={onLoginFailure}
    // onLogoutSuccess={onLogoutSuccess}
    // getInstance={setNodeRef(this, 'facebook')}
    key={'facebook'}
    onInternetFailure={() => { return true }}
    autoLogin={true}>
    {!logged && <button>Login</button>}
  </SocialButton>

}