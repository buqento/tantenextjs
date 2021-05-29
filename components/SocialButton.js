import React from 'react'
import SocialLogin from 'react-social-login'
class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props
    return <span onClick={triggerLogin} {...props}>{children}</span>
  }
}
export default SocialLogin(SocialButton)