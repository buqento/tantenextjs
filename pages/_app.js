import React from 'react'
import Router from "next/router";
import { shape, func } from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/swiper.scss'
import '../styles/globals.css'
import '../styles/styles.css'
import { BiLoaderCircle } from 'react-icons/bi'

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => { setLoading(true) }
    const end = () => { setLoading(true) }
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
    <>
      {
        loading ?
          <div className="container-center text-center">
            <div className="text-center">
              <div><BiLoaderCircle size={22} className="animate-spin inline mr-1 mb-1" />Sedang diproses</div>
            </div>
          </div>
          : <Component {...pageProps} />
      }
    </>
  );
  // return <Component {...pageProps} />
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