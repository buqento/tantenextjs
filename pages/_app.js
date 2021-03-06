import React from 'react'
import { Provider } from 'next-auth/client'
import Router from "next/router"
import { shape, func } from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-input-range/lib/css/index.css'
import 'swiper/swiper.scss'
import '../styles/globals.css'
import '../styles/styles.css'
import { BiLoaderCircle } from 'react-icons/bi'
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => { setLoading(true) }
    const end = () => { setLoading(false) }
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <Provider session={pageProps.session}>
      {
        loading ?
          <div className="container-center text-center">
            <div className="text-center">
              <div><BiLoaderCircle size={22} className="animate-spin inline mr-1 mb-1" />Loading</div>
            </div>
          </div>
          :
          <Component {...pageProps} />
      }
    </Provider>
  )
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