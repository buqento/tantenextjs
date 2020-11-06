import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/styles.css'
import 'swiper/swiper.scss'
import { shape, func } from 'prop-types'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: func,
  pageProps: shape({})
}

MyApp.defaultProps = {
  Component: null,
  pageProps: null
}

export default MyApp